const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array(),
      url: req.fullUrl,
      createdAt: new Date()
    });
  }
  next();
};
