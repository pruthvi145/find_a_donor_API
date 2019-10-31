const express = require("express");
const router = express.Router();

const { getAllOtpsController } = require("../controllers/otpsController");
router.get("/", getAllOtpsController);

module.exports = router;
