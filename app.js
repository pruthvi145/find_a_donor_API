//setting up environment variables
require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");

//connectig to the database
const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_CONNECT
    : process.env.MONGO_CONNECT_TEST;

db(connectionString);

//importing middlewares
const injectFullUrl = require("./routes/middlewares/injectFullUrl");
const { netWorkError } = require("./routes/middlewares/errors");
//importing routes
const indexRoute = require("./routes/endpoints/index");
const usersRoute = require("./routes/endpoints/users");
const otpsRoute = require("./routes/endpoints/otps");

//middlewares
app.use(express.json());
app.use(injectFullUrl);
//setting up routes
app.use("/", indexRoute);
app.use("/api/users", usersRoute);
app.use("/api/otps", otpsRoute);
//error - middleware
app.use(netWorkError);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

module.exports = app;
