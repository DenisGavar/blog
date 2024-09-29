const Post = require("../models/post");

class PostRepository {
  constructor(logger) {
    this.logger = logger;
  }

  async create(postData) {
    const user = await Post.create(postData);
    return user;
  }

  async getAllPosts() {
    const users = await Post.find().populate("author categories");
    return users;
  }

  async getPost(id) {
    const user = await Post.findById(id).populate("author categories");
    return user;
  }

  async updatePost(id, postData) {
    const user = await Post.findByIdAndUpdate(id, postData, {
      new: true,
      runValidators: true,
    });
    return user;
  }

  async deletePost(id) {
    const user = await Post.findByIdAndDelete(id);
    return user;
  }

  async searchPosts(filter) {
    const posts = await Post.find(filter).populate("author categories");
    return posts;
  }

  async addCategoriesToPost(id, categoryIds) {
    const post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { categories: { $each: categoryIds } } },
      { new: true }
    );
    return post;
  }
}

module.exports = PostRepository;
