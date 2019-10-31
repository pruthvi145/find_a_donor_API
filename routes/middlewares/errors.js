module.exports.netWorkError = (err, req, res, next) => {
  // TODO: Logging the errors
  console.log(err);
  return res.status(500).json({
    status: "failed",
    statusCode: 500,
    msg: null,
    data: null,
    errors: [{ msg: "Internal server problem!" }],
    url: req.fullUrl,
    createdAt: new Date()
  });
};

module.exports.invalidInputError = (err, req, res) => {
  return res.status(422).json({
    status: "invalid",
    statusCode: 422,
    msg: null,
    data: null,
    errors: err,
    url: req.fullUrl,
    createdAt: new Date()
  });
};
