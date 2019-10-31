const { validationResult } = require("express-validator");
const { invalidInputError } = require("./errors");
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return invalidInputError(errors.array(), req, res);
  next();
};
