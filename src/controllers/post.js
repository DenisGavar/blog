const Post = require("../models/post");
const User = require("../models/user");
const Category = require("../models/category");

// Create post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author categories");
    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get post by ID
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author categories"
    );
    if (!post) {
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found" });
    }
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found" });
    }
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found" });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// searchPosts
exports.searchPosts = async (req, res) => {
  try {
    const { title, author, category } = req.query;

    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    if (author) {
      const user = await User.findOne({ username: author });
      if (user) {
        filter.author = user._id;
      }
    }

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        filter.categories = categoryDoc._id;
      }
    }

    const posts = await Post.find(filter).populate("author categories");

    res.status(200),
      json({
        status: "success",
        data: { posts },
      });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addCategoriesToPost = async (req, res) => {
  try {
    const { id, categoryIds } = req.params;

    const categoriesArray = categoryIds.split(",");

    const categories = await Category.find({ _id: { $in: categoriesArray } });
    if (categories.length !== categoriesArray.length) {
      res.status(400).json({
        status: "fail",
        message: "One or more categories not found",
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found" });
    }

    post.categories = [...new Set([...post.categories, ...categoriesArray])];
    await post.save();

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
