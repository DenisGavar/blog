class PostController {
  constructor(logger, postService) {
    this.postService = postService;
    this.logger = logger;
  }

  // Create post
  async createPost(req, res) {
    try {
      const newPost = await this.postService.create(req.body);
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
  }

  // Get all posts
  async getAllPosts(req, res) {
    try {
      const posts = await this.postService.getAllPosts();
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
  }

  // Get post by ID
  async getPost(req, res) {
    try {
      const post = await this.postService.getPost(req.params.id);
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
  }

  // Update post
  async updatePost(req, res) {
    try {
      const post = await this.postService.updatePost(req.params.id, req.body);
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
  }

  // Delete post
  async deletePost(req, res) {
    try {
      const post = await this.postService.deletePost(req.params.id);
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
  }

  // searchPosts
  async searchPosts(req, res) {
    try {
      const posts = await this.postService.searchPosts(req.query);

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
  }

  async addCategoriesToPost(req, res) {
    try {
      const { id, categoryIds } = req.params;
      const post = await this.postService.addCategoriesToPost(id, categoryIds);

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
  }
}

module.exports = PostController;
