const User = require("../../models/User");
const OTP = require("../../models/OTP");
const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../../utils/errorRsponse");

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/admin
exports.getUsers = asyncHandler(async (req, res) => {
  // TODO: apply advance result based on query
  const users = await User.find();
  //getting all users.
  return res.status(200).json({
    success: true,
    msg: "Fetched all users successfully!",
    data: { users },
    url: req.fullUrl,
    createdAt: new Date()
  });
});

// @desc      Get one user
// @route     GET /api/v1/users/:id
// @access    Private/admin
exports.getUser = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new ErrorResponse("Invalid user ID!", 422);

  const user = await User.findById(req.params.id).select("-__v -password");
  //getting all users.
  return res.status(200).json({
    success: true,
    msg: "Fetched a user successfully!",
    data: { user },
    url: req.fullUrl,
    createdAt: new Date()
  });
});

// @desc      Create user
// @route     delete /api/v1/users/:id
// @access    Private/admin
exports.createUser = asyncHandler(async (req, res) => {
  // TODO: Implement this one
  return res.status(200).json({
    success: true,
    msg: "Fetched all users successfully!",
    data: { users },
    url: req.fullUrl,
    createdAt: new Date()
  });
});

// @desc      Delete One user
// @route     delete /api/v1/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw new ErrorResponse("Invalid user ID!", 422);
  const deleteRes = await User.deleteOne({
    _id: req.params.id,
    role: { $not: /admin/ }
  });
  return res.json({
    success: true,
    msg: "Deleted a user successfully!",
    data: { deletedCount: deleteRes.deletedCount },
    url: req.fullUrl,
    createdAt: new Date()
  });
});
