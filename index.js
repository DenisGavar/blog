const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user");
const postRoutes = require("./src/routes/post");
const categoryRoutes = require("./src/routes/category");
const signRoutes = require("./src/routes/sign");
const passwordResetRoutes = require("./src/routes/password-reset");
const authenticate = require("./src/middlewares/auth");
const log = require("./src/middlewares/log");

const logger = require("./src/utils/logger");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Middleware to log HTTP requests
app.use(log);

// Routes to sign up/in or to change a password
app.use("/api/v1", signRoutes);
app.use("/api/v1/password", passwordResetRoutes);

// Middleware to authenticate
app.use(authenticate);

// Routes to access the information
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/categories", categoryRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Listening on ${port}`);
});

// TODO: add tests
// TODO: add refresh token
