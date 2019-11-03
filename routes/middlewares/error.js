const ErrorResponse = require("../../utils/errorRsponse");

exports.errorHandler = (err, req, res, next) => {
  // console.log(err);
  if (!err instanceof ErrorResponse || err.statusCode === 500) console.log(err);
  // log the error if client side error
  return res.status(err.statusCode || 500).json({
    success: false,
    errors: [{ msg: err.message || "Internal server error!" }],
    url: req.fullUrl,
    createdAt: new Date()
  });
};
