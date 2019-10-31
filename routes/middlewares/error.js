module.exports = (err, req, res, next) => {
  // TODO: Logging the errors
  console.log(err);
  res.status(500).json({
    errors: [{ msg: "Internal server problem!" }]
  });
};
