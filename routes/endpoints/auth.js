const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
//importing validators
const {
  sendcodeValidator,
  verifycodeValidator,
  regiterValidator,
  loginValidator
} = require("../validators/authValidator");

const {
  sendcode,
  smsStatus,
  verifycode,
  register,
  getMe,
  login
} = require("../controllers/auth");

// Registration
router.post("/sendcode", sendcodeValidator, sendcode);
router.post("/verifycode", verifycodeValidator, verifycode);
router.patch("/register", [protect, ...regiterValidator], register);

// login
router.post("/login", loginValidator, login);
router.get("/me", protect, getMe);

// Utils
router.post("/status", smsStatus);
module.exports = router;
