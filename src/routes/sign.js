// src/routes/user.js
const express = require("express");
const { userController } = require("../infrastructure/container");

const router = express.Router();

router.post("/signin", userController.signIn);
router.post("/signup", userController.createUser);

module.exports = router;
