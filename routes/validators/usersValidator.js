const { check } = require("express-validator");
const validate = require("../middlewares/validate");
const { OTPlength, allowedCountryCodes } = require("../../config/config");
module.exports.postSendcodeValidator = [
  check("phone")
    .not()
    .isEmpty()
    .withMessage("Phone number is required!")
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number!"),

  check("countryCode")
    .optional()
    .isNumeric()
    .withMessage("Invalid format of countryCode!")
    .isIn(allowedCountryCodes)
    .withMessage(
      "Invalid countryCode - no service is avalible for this country!"
    ),
  validate
];

module.exports.postRegisterVerifyValidator = [
  check("phone")
    .not()
    .isEmpty()
    .withMessage("Phone number is required!")
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number!"),

  check("countryCode")
    .optional()
    .isNumeric()
    .withMessage("Invalid format of countryCode!")
    .isIn(allowedCountryCodes)
    .withMessage(
      "Invalid countryCode - no service is avalible for this country!"
    ),

  check("code")
    .not()
    .isEmpty()
    .withMessage("Verification code is required!")
    .isLength({ min: OTPlength, max: OTPlength })
    .withMessage("Invalid verification code!")
    .isNumeric()
    .withMessage("Invalid verification code!"),
  validate
];
