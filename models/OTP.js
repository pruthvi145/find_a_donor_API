const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  phone: {
    type: String,
    required: true,
    minlength: 10, //assuming the country is india
    maxlength: 10,
    unique: true
  },
  countryCode: {
    type: String,
    default: "91"
  },
  code: {
    type: String,
    required: true
  },
  updateCount: {
    type: Number,
    default: 0
  }
});

const OTP = mongoose.model("Otp", OTPSchema);
module.exports = OTP;
