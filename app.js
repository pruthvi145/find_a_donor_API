const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");

//Load the env variables
dotenv.config();

// Intializing express
const app = express();

//connectig to the database
connectDB();

//importing middlewares
const injectFullUrl = require("./routes/middlewares/injectFullUrl");
const { errorHandler } = require("./routes/middlewares/error");

//importing routes
const indexRoute = require("./routes/endpoints/index");
const authRoute = require("./routes/endpoints/auth");
const usersRoute = require("./routes/endpoints/users");
const otpsRoute = require("./routes/endpoints/otps");

//Pre middlewares
app.use(express.json());
app.use(injectFullUrl);

//mounting routes
app.use("/", indexRoute);

//  /api/v1
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/otps", otpsRoute);

//errorHandler:  Post middlewares
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
