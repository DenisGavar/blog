const dotenv = require("dotenv");
const express = require("express");

const connectDB = require("./src/config/db");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
// TODO: add routes

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on", port);
});
