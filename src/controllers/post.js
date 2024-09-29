const { postService } = require("../infrastructure/container");

// Create post
exports.createPost = async (req, res) => {
  try {
    const newPost = await postService.create(req.body);
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
    const posts = await postService.getAllPosts();
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
    const post = await postService.getPost(req.params.id);
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
    const post = await postService.updatePost(req.params.id, req.body);
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
    const post = await postService.deletePost(req.params.id);
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
    const posts = await postService.searchPosts(req.query);

    res.status(200).json({
      status: "success",
      data: { posts },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addCategoriesToPost = async (req, res) => {
  try {
    const { id, categoryIds } = req.params;
    const post = await postService.addCategoriesToPost(id, categoryIds);

    if (post) {
      res.status(200).json({
        status: "success",
        data: null,
      });
    } else {
      res.status(404).json({
        status: "fail",
        data: "Post not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
