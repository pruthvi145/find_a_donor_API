const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { allowedCountryCodes } = require("../config/config");
const OTPSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },
  countryCode: {
    type: String,
    default: "91",
    enum: allowedCountryCodes
  },
  code: {
    type: String,
    required: true
  },
  updateCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    expires: 600, //delete OTP after 10 mins
    default: Date.now
  }
});

const OTP = mongoose.model("Otp", OTPSchema);
module.exports = OTP;
