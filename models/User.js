const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const {
  allowedCountryCodes,
  allowedUserRoles,
  allowedBloodGroups
} = require("../config/config");

const userSchema = new Schema({
  name: {
    type: String
  },
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
  password: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "user",
    enum: allowedUserRoles
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
    enum: allowedBloodGroups,
    default: "B+" //becuase the most common one
  },
  isDonor: {
    type: Boolean,
    default: false
  },
  bmi: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

//change the update time automatically!
userSchema.pre("updateOne", function() {
  this.set({ updatedAt: new Date() });
});

//genrating auth token
userSchema.methods.generateAuthToken = function() {
  const payload = { user: this._id, role: this.role };
  return jwt.sign(payload, process.env.SECRETE_KEY);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
