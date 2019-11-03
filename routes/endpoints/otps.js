const express = require("express");
const router = express.Router();

const { getOtps } = require("../controllers/otps");
const { protect, authorize } = require("../middlewares/auth");

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(getOtps);

module.exports = router;
