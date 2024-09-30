const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require('cookie-parser');

const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user");
const postRoutes = require("./src/routes/post");
const categoryRoutes = require("./src/routes/category");
const signRoutes = require("./src/routes/sign")
const authenticate = require("./src/middlewares/auth")
const log = require("./src/middlewares/log")

const logger = require("./src/utils/logger");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Middleware to log HTTP requests
app.use(log);

app.use("/api/v1", signRoutes)

app.use(authenticate);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/categories", categoryRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info("Listening on", port);
});

// TODO: add refresh token
// TODO: add logging
// TODO: add documentation
// TODO: check folder structure
