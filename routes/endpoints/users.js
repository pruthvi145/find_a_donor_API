const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

//importing validators
const {
  postSendcodeValidator,
  postRegisterVerifyValidator
} = require("../validators/usersValidator");
//importing controllers
const {
  getAllUserController,
  postSendcodeController,
  postRegisterVerifyController,
  patchRegisterController,
  deleteUserController,
  deleteAllUsersController
} = require("../controllers/usersController");

//* Get all users
router.get("/", getAllUserController);

//* Get one users

//* Creating user
// 1. sending OTP to the mobile number.
router.post("/sendcode", postSendcodeValidator, postSendcodeController);

// 2. verifying the OTP.
router.post(
  "/register/verify",
  postRegisterVerifyValidator,
  postRegisterVerifyController
);

// 3. Continue the registration - save the addition required field.
router.patch("/register", patchRegisterController);

//* Delete one user.
router.delete("/:id", deleteUserController);
//* Delete all users.
router.delete("/", deleteAllUsersController);
module.exports = router;
