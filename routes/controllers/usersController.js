const User = require("../../models/User");
const { validationResult } = require("express-validator");
const axios = require("axios");
const OTP = require("../../models/OTP");
const generateOTP = (otpLength = 6) => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 1; i <= otpLength; i++) {
    const index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }

  return otp;
};

const sendSMS = async (phoneWithCountryCode, otp) => {
  const baseURL = "https://platform.clickatell.com/messages/http/send";
  const apiKey = process.env.CLICKATELL_API_KEY;
  const message = `${otp} is your verification code for Find A Donor app.\nValid upto 10 minutes.`;
  return await axios.get(baseURL, {
    params: {
      apiKey,
      to: phoneWithCountryCode,
      content: message
    }
  });
};

module.exports.getAllUserController = async (req, res) => {
  const users = await User.find();
  //getting all users.
  res.json({ users });
};

module.exports.postSendcodeController = async (req, res, next) => {
  // verify user inputs - using express - validator
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

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
    const otp = generateOTP(6); // OTP of 6 digits

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
      msg: `Verification code is sent to the +${countryCode}${phone}`
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.postRegisterVerifyController = (req, res) => {
  res.send("Verify Registeration.");
};

module.exports.patchRegisterController = (req, res) => {
  res.send("Continuing the remainging registration.");
};
