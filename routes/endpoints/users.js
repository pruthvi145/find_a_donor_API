const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
//importing controller
const {
  getAllUserController,
  postSendcodeController,
  postRegisterVerifyController,
  patchRegisterController
} = require("../controllers/usersController");

//* Get all users
router.get("/", getAllUserController);

//* Get one users

//* Creating user
// 1. sending OTP to the mobile number.
router.post(
  "/sendcode",
  [
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
      .isIn(["91"])
      .withMessage(
        "Invalid countryCode - no service is avalible for this country!"
      )
  ],
  postSendcodeController
);

// 2. verifying the OTP.
router.post("/register/verify", postRegisterVerifyController);

// 3. Continue the registration - save the addition required field.
router.patch("/register", patchRegisterController);

//* Delete one user.
//* Delete all users.
module.exports = router;
