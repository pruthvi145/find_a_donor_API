const OTP = require("../../models/OTP");

module.exports.getAllOtpsController = async (req, res, next) => {
  try {
    const otps = await OTP.find();
    res.json({ otps });
  } catch (ex) {
    next(ex);
  }
};
