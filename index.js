const dotenv = require("dotenv");
const express = require("express");

const connectDB = require("./src/config/db");
const userRoutes = require('./src/routes/user');
const postRoutes = require('./src/routes/post');
const categoryRoutes = require('./src/routes/category');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/va/posts", postRoutes);
app.use("/api/v1/categories", categoryRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on", port);
});
