const express = require("express");
const { userController } = require("../infrastructure/container");

const router = express.Router();

router.post("/request-reset", userController.requestPasswordReset);
router.post("/reset/:token", userController.passwordReset);

module.exports = router;
