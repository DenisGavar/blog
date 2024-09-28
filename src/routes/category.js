const express = require("express");
const categoryController = require("../controllers/category");
const router = express.Router();

// CRUD routes for Category
router.post("/", categoryController.createCategory); // Create category
router.get("/", categoryController.getAllCategories); // Get all categories
router.get("/:id", categoryController.getCategory); // Get category by ID
router.put("/:id", categoryController.updateCategory); // Update category by ID
router.delete("/:id", categoryController.deleteCategory); // Delete category by ID

// Print all posts in certain category
router.get("/:id/posts", categoryController.getPosts);

module.exports = router;
