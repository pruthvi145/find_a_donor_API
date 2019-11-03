const OTP = require("../../models/OTP");
const asyncHandler = require("../middlewares/async");

// @desc      Get all OTPs
// @route     GET /api/v1/otps
// @access    Private/admin
module.exports.getOtps = asyncHandler(async (req, res) => {
  const otps = await OTP.find();
  res.json({
    success: true,
    msg: "Fetched all OTPs successfully!",
    data: { otps },
    url: req.fullUrl,
    createdAt: new Date()
  });
});
