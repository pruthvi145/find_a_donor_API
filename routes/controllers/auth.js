const generateOTP = require("../../utils/helpers/generateOTP");
const { sendSMS } = require("../../utils/helpers/clickatellAPI");
const { OTPlength } = require("../../config/config");
const asyncHandler = require("../middlewares/async");
const User = require("../../models/User");
const OTP = require("../../models/OTP");
const ErrorResponse = require("../../utils/errorRsponse");

// @desc      Send verification code
// @route     POST /api/v1/auth/sendcode
// @access    Public
exports.sendcode = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const countryCode = req.body.countryCode || "91";

  // create User, if not exists.
  let user = await User.findOne({ phone });
  if (!user) {
    user = new User({
      phone,
      countryCode
    });
    await user.save();
  }

  const otp = generateOTP(OTPlength);

  // send OTP with any third pary messaging API
  messageResponse = await sendSMS(countryCode + phone, otp);
  if (messageResponse.data.error || messageResponse.status !== 202) {
    //Internal Server error
    throw new ErrorResponse(messageResponse.data.error, 500);
  }
  // Save OTP
  let dbOTP = await OTP.findOne({ phone });

  if (dbOTP) {
    //update code
    await dbOTP.updateOne({ code: otp, $inc: { updateCount: 1 } });
  } else {
    dbOTP = new OTP({
      phone,
      countryCode,
      code: otp
    });
    await dbOTP.save();
  }

  // send Response
  return res.status(202).json({
    success: true,
    msg: `Verification code is sent to the +${countryCode}${phone}.`,
    data: {
      messageId: messageResponse.data.messages[0].apiMessageId,
      to: `+${countryCode}${phone}`
    },
    url: req.fullUrl,
    createdAt: new Date()
  });
});

// @desc      verify verification code
// @route     POST /api/v1/auth/verifycode
// @access    Public
exports.verifycode = asyncHandler(async (req, res) => {
  const { phone, code } = req.body;
  const countryCode = req.body.countryCode || "91";

  //check if valid otp
  const user = await User.findOne({ phone, countryCode });
  const otp = await OTP.findOne({ phone, countryCode, code });

  if (!user || !otp) {
    throw new ErrorResponse("Invalid phone or verification code!", 422);
  }

  //update user to verified
  if (user.isVerified === false) {
    await user.updateOne({ isVerified: true });
  }
  // delete otp
  await OTP.deleteOne({ _id: otp._id });

  //generate auth token
  const token = user.generateAuthToken();

  return res
    .status(200)
    .header("Authorization", token)
    .json({
      success: true,
      msg: "User verified successfully!",
      data: {},
      url: req.fullUrl,
      createdAt: new Date()
    });
});

// @desc      register user
// @route     POST /api/v1/auth/register
// @access    Private/verified
exports.register = asyncHandler(async (req, res) => {
  const { name, password, dob, gender, bloodGroup } = req.body;

  const user = req.user;

  if (!user.isVerified) {
    throw new ErrorResponse("User is not verified!", 401);
  }

  user.set({ name, dob, gender, bloodGroup });

  // Will only update password fisrt time
  if (!user.password) user.set({ password });

  await user.save();

  return res.status(200).json({
    success: true,
    msg: "Updated current user successfully!",
    data: {},
    url: req.fullUrl,
    createdAt: new Date()
  });
});

// @desc      get Current LoggedIn user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    success: true,
    msg: "fetched current user successfully!",
    data: { user },
    url: req.fullUrl,
    createdAt: new Date()
  });
});

// @desc      get Current LoggedIn user
// @route     GET /api/v1/auth/me
// @access    Public/verified
exports.login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  const countryCode = req.body.countryCode || "91";

  const user = await User.findOne({ phone, countryCode }).select("+isVerified");
  if (!user) throw new ErrorResponse("Invalid phone or password!", 422);
  if (!user.isVerified)
    throw new ErrorResponse(
      "Phone number is not verified, Please verify it!",
      403
    );

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new ErrorResponse("Invalid phone or password!", 422);

  const token = user.generateAuthToken();

  return res.header("Authorization", token).json({
    success: true,
    data: {},
    msg: "User logged in successfully!",
    url: req.originalUrl,
    createdAt: new Date()
  });
});

exports.smsStatus = (req, res) => {
  console.log(req.body);
  res.send("got response");
};
