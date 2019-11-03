const mongoose = require("mongoose");

module.exports = () => {
  const connectionString =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_CONNECT
      : process.env.MONGO_CONNECT_TEST;

  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log(`Connected to the database successfully!`))
    .catch(err => console.log(`Can't connect to the database!\n`, err));
};
