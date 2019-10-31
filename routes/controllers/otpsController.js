const OTP = require("../../models/OTP");

module.exports.getAllOtpsController = async (req, res, next) => {
  try {
    const otps = await OTP.find();
    res.json({
      status: "success",
      statusCode: 200,
      msg: "Fetched all users successfully!",
      data: { otps },
      errors: null,
      url: req.fullUrl,
      createdAt: new Date()
    });
  } catch (ex) {
    next(ex);
  }
};
