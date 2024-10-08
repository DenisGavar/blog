const express = require("express");
const { postController }= require("../infrastructure/container");
const router = express.Router();

// Search
router.get("/search", postController.searchPosts);

// CRUD routes for Post
router.post("/", postController.createPost); // Create post
router.get("/", postController.getAllPosts); // Get all posts
router.get("/:id", postController.getPost); // Get post by ID
router.put("/:id", postController.updatePost); // Update post by ID
router.delete("/:id", postController.deletePost); // Delete post by ID

// Add categories to a post
router.post("/:id/categories/:categoryIds", postController.addCategoriesToPost);

module.exports = router;
