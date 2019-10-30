const User = require("../../models/User");

module.exports.getAllUserController = async (req, res) => {
  const users = await User.find();
  //getting all users.
  res.json({ users });
};

module.exports.postSendcodeController = (req, res) => {
  //checking the valid inputs.
  //create user to db if not exist.
  // generate OTP
  // send OTP via any Messageing API
  // hadling the error - for sending message
  // save OTP to db.
  // send response.
  res.send("Sending OTP");
};

module.exports.postRegisterVerifyController = (req, res) => {
  res.send("Verify Registeration.");
};
