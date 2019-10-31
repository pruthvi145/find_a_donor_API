const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    statusCode: 200,
    msg: "Welcome to the Find A Donor backend API.",
    data: {},
    errors: null,
    url: req.fullUrl,
    createdAt: new Date()
  });
});

module.exports = router;
