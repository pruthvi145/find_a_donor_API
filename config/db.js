const mongoose = require("mongoose");

module.exports = connectionString => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log(`Connected to the database successfully!`))
    .catch(err => console.log(`Can't connect to the database!\n`, err));
};
