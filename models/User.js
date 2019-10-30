const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  phone: {
    type: String,
    required: true,
    minlength: 10, //assuming the country is india
    maxlength: 10
  },
  countryCode: {
    type: String,
    default: "91"
  },
  password: String,
  isVerified: {
    type: String,
    default: false
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "super-admin"]
  },
  dob: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male"
  },
  //considering ABO system
  bloodGroup: {
    type: String,
    enum: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
    default: "B+" //becuase the most common one
  },
  isDonor: {
    type: Boolean,
    default: false
  },
  bmi: {
    type: Number,
    default: -1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
// TODO: add middleware for automatically update the updatedAt and creadtedAt field.
const User = mongoose.model("User", userSchema);

module.exports = User;
