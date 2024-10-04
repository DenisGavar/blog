class PostController {
  constructor(logger, postService) {
    this.postService = postService;
    this.logger = logger;

    this.createPost = this.createPost.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.searchPosts = this.searchPosts.bind(this);
    this.addCategoriesToPost = this.addCategoriesToPost.bind(this);
  }

  // Create post
  async createPost(req, res) {
    try {
      const op = "controllers.post.createPost";
      const message = { op: op, title: req.body.title };
      this.logger.info("", message);

      const newPost = await this.postService.create(req.body);
      res.status(201).json({
        status: "success",
        data: newPost,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get all posts
  async getAllPosts(req, res) {
    try {
      const op = "controllers.post.getAllPosts";
      const message = { op: op };
      this.logger.info("", message);

      const posts = await this.postService.getAllPosts();
      res.status(200).json({
        status: "success",
        data: posts,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get post by ID
  async getPost(req, res) {
    try {
      const op = "controllers.post.getPost";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const post = await this.postService.getPost(req.params.id);
      if (!post) {
        this.logger.error(err);
        return res.status(404).json({
          status: "fail",
          message: "Post not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: post,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Update post
  async updatePost(req, res) {
    try {
      const op = "controllers.post.updatePost";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const post = await this.postService.updatePost(req.params.id, req.body);
      if (!post) {
        this.logger.error(err);
        return res.status(404).json({
          status: "fail",
          message: "Post not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: post,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Delete post
  async deletePost(req, res) {
    try {
      const op = "controllers.post.deletePost";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const post = await this.postService.deletePost(req.params.id);
      if (!post) {
        this.logger.error(err);
        return res.status(404).json({
          status: "fail",
          message: "Post not found",
        });
      }
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get posts by title, author, category
  async searchPosts(req, res) {
    try {
      const op = "controllers.post.searchPosts";
      const message = { op: op, query: req.query };
      this.logger.info("", message);

      const posts = await this.postService.searchPosts(req.query);

      res.status(200).json({
        status: "success",
        data: { posts },
      });
    } catch (err) {
      this.logger.error(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Link a post to categories 
  async addCategoriesToPost(req, res) {
    try {
      const { id, categoryIds } = req.params;

      const op = "controllers.post.addCategoriesToPost";
      const message = { op: op, is: id, categories: categoryIds };
      this.logger.info("", message);

      const post = await this.postService.addCategoriesToPost(id, categoryIds);

      if (post) {
        res.status(200).json({
          status: "success",
          data: null,
        });
      } else {
        this.logger.error(err);
        res.status(404).json({
          status: "fail",
          data: "Post not found",
        });
      }
    } catch (err) {
      this.logger.error(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  }
}

module.exports = PostController;
