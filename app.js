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

//importing routes
const usersRoute = require("./routes/endpoints/users");

app.get("/", (req, res) =>
  res.send("Welcome to the Find A Donor backend API.")
);
//setting up routes
app.use("/users", usersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
