const Post = require("../models/post");

class PostRepository {
  constructor(logger) {
    this.logger = logger;
  }

  async create(postData) {
    const op = "repositories.post.create";
    const message = { op: op };
    this.logger.info("", message);

    const user = await Post.create(postData);
    return user;
  }

  async getAllPosts() {
    const op = "repositories.post.getAllPosts";
    const message = { op: op };
    this.logger.info("", message);

    const users = await Post.find().populate("author categories");
    return users;
  }

  async getPost(id) {
    const op = "repositories.post.getPost";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await Post.findById(id).populate("author categories");
    return user;
  }

  async updatePost(id, postData) {
    const op = "repositories.post.updatePost";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await Post.findByIdAndUpdate(id, postData, {
      new: true,
      runValidators: true,
    });
    return user;
  }

  async deletePost(id) {
    const op = "repositories.post.deletePost";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await Post.findByIdAndDelete(id);
    return user;
  }

  async searchPosts(filter) {
    const op = "repositories.post.searchPosts";
    const message = { op: op, filter: filter };
    this.logger.info("", message);

    const posts = await Post.find(filter).populate("author categories");
    return posts;
  }

  async addCategoriesToPost(id, categoryIds) {
    const op = "repositories.post.addCategoriesToPost";
    const message = { op: op, id: id, categoryIds: categoryIds };
    this.logger.info("", message);

    const post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { categories: { $each: categoryIds } } },
      { new: true }
    );
    return post;
  }
}

module.exports = PostRepository;
