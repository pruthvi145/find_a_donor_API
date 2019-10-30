const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//controller
const {
  getAllUserController,
  postSendcodeController,
  postRegisterVerifyController
} = require("../controllers/usersController");
//CRUD - users
router.get("/", getAllUserController);

//Creating user
// 1. sending OTP to the mobile number.
router.post("/sendcode", postSendcodeController);

// 2. verifying the OTP.
router.post("/register/verify", postRegisterVerifyController);
// 3. Continue the registration - save the addition required field.

//deleting the one user.
//deleting all users.

module.exports = router;
