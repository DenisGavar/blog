const express = require("express");
const { userController }= require("../infrastructure/container");
const router = express.Router();

// CRUD routes for User
router.post("/", userController.createUser); // Create user
router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getUser); // Get user by ID
router.put("/:id", userController.updateUser); // Update user by ID
router.delete("/:id", userController.deleteUser); // Delete user by ID

module.exports = router;
