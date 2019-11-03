const { check } = require("express-validator");
const validate = require("../middlewares/validate");

const {
  OTPlength,
  allowedCountryCodes,
  allowedBloodGroups
} = require("../../config/config");

const sendcodeValidator = [
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

const verifycodeValidator = [
  check("code")
    .not()
    .isEmpty()
    .withMessage("Verification code is required!")
    .isLength({ min: OTPlength, max: OTPlength })
    .withMessage("Invalid verification code!")
    .isNumeric()
    .withMessage("Invalid verification code!"),
  ...sendcodeValidator
];

const regiterValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isString()
    .withMessage("Invalid format of name - Must be string!")
    .not()
    .isNumeric()
    .withMessage("Invalid format of name - Must be string!"),
  check("password")
    .isString()
    .withMessage(
      "Invalid format of password - Must be an alpha-numeric string!"
    )
    .isLength({ min: 5 })

    .withMessage(
      "Invalid format of password - it should be atleast of 5 characters!"
    ),
  check("dob")
    .not()
    .isEmpty()
    .withMessage("Date of birth is required!")
    .isISO8601()
    .withMessage("Invalid date format - must be in ISO8601 format!"),
  check("gender")
    .not()
    .isEmpty()
    .withMessage("Gender must not be empty!")
    .isIn(["male", "female"])
    .withMessage("Invalid value for gender!"),
  check("bloodGroup")
    .isIn(allowedBloodGroups)
    .withMessage("Invalid blood group!"),
  validate
];

const loginValidator = [
  check("password")
    .isString()
    .withMessage(
      "Invalid format of password - Must be an alpha-numeric string!"
    )
    .isLength({ min: 5 })

    .withMessage(
      "Invalid format of password - it should be atleast of 5 characters!"
    ),
  ...sendcodeValidator
];

module.exports = {
  sendcodeValidator,
  verifycodeValidator,
  regiterValidator,
  loginValidator
};
