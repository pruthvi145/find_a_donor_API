const User = require("../../models/User");
const OTP = require("../../models/OTP");
const mongoose = require("mongoose");
const generateOTP = require("../../utils/helpers/generateOTP");
const { sendSMS } = require("../../utils/helpers/clickatellAPI");
const { OTPlength } = require("../../config/config");
const { invalidInputError } = require("../middlewares/errors");
//Standered response for our API
const stdResponse = {
  status:
    "success" || "failed" || "denied" || "not found" || "pending" || "invalid",
  statusCode: 200 || 500 || 403 || 404 || 202 || 422,
  msg: "<MESSAGE>" || null,
  data: {},
  errors: [{ msg: "<ERROR MESSAGES>" }] || null,
  url: "<REQUESTED URL>",
  createdAt: new Date()
};

module.exports.getAllUserController = async (req, res) => {
  const users = await User.find();
  //getting all users.
  return res.json({
    status: "success",
    statusCode: 200,
    msg: "Fetched all users successfully!",
    data: { users },
    errors: null,
    url: req.fullUrl,
    createdAt: new Date()
  });
};

module.exports.postSendcodeController = async (req, res, next) => {
  // verify user inputs - using express - validator

  // extract information
  const { phone } = req.body;
  const countryCode = req.body.countryCode || "91";

  try {
    // create User, if not exists.
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({
        phone,
        countryCode
      });

      await user.save();
    }

    // generate OTP
    const otp = generateOTP(OTPlength); // OTP of 6 digits

    // send OTP with any third pary messaging API
    messageResponse = await sendSMS(countryCode + phone, otp);
    if (messageResponse.data.error || messageResponse.status !== 202) {
      //Internal Server error
      throw messageResponse.data.error;
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
    return res.json({
      status: "success",
      statusCode: 202,
      msg: `Verification code is sent to the +${countryCode}${phone}.`,
      data: {},
      errors: null,
      url: req.fullUrl,
      createdAt: new Date()
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.postRegisterVerifyController = async (req, res) => {
  //verifying the user inputs - done

  // extract information
  const { phone, code } = req.body;
  const countryCode = req.body.countryCode || "91";
  try {
    //check if valid otp
    const user = await User.findOne({ phone, countryCode });
    const otp = await OTP.findOne({ phone, countryCode, code });

    if (!user || !otp) {
      return invalidInputError(
        [{ msg: "Invalid phone or verification code!" }],
        req,
        res
      );
    }
    //update user to verified
    if (user.isVerified === false) {
      await user.updateOne({ isVerified: true });
    }
    // delete otp
    await OTP.deleteOne({ _id: otp._id });

    //generate auth token
    const token = user.generateAuthToken();

    //send response with token

    return res.header("Authorization", token).json({
      status: "success",
      statusCode: 200,
      msg: "User verified successfully!",
      data: {},
      errors: null,
      url: req.fullUrl,
      createdAt: new Date()
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.patchRegisterController = (req, res) => {
  res.send("Continuing the remainging registration.");
};

module.exports.deleteAllUsersController = async (req, res, next) => {
  try {
    const deleteRes = await User.deleteMany({});
    return res.json({
      status: "success",
      statusCode: 200,
      msg: "Deleted all users successfully!",
      data: { deletedCount: deleteRes.deletedCount },
      errors: null,
      url: req.fullUrl,
      createdAt: new Date()
    });
  } catch (ex) {
    next(ex);
  }
};
module.exports.deleteUserController = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return invalidInputError([{ msg: "Invalid user ID!" }]);
    }
    const deleteRes = await User.deleteOne({ _id: req.params.id });
    return res.json({
      status: "success",
      statusCode: 200,
      msg: "Deleted a user successfully!",
      data: { deletedCount: deleteRes.deletedCount },
      errors: null,
      url: req.fullUrl,
      createdAt: new Date()
    });
  } catch (ex) {
    next(ex);
  }
};
