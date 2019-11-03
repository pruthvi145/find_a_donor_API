const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorRsponse");
// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    throw new ErrorResponse(
      "Not authorized to access this route - no auth token is provided!",
      401
    );
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    const user = await User.findById(decoded.user.id);
    if (!user)
      throw new ErrorResponse(
        "Not authorized to access this route - Invalid auth token!",
        401
      );
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      throw new ErrorResponse(
        "Not authorized to access this route - Invalid auth token!",
        401
      );
    next(new ErrorResponse(err.message, 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new ErrorResponse(
        `User role ${req.user.role} is not authorized to access this route!`,
        403
      );
    next();
  };
};
