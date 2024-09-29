const Post = require("../models/post");

exports.create = async (postData) => {
  const user = await Post.create(postData);
  return user;
};

exports.getAllPosts = async () => {
  const users = await Post.find().populate("author categories");
  return users;
};

exports.getPost = async (id) => {
  const user = await Post.findById(id).populate("author categories");
  return user;
};

exports.updatePost = async (id, postData) => {
  const user = await Post.findByIdAndUpdate(id, postData, {
    new: true,
    runValidators: true,
  });
  return user;
};

exports.deletePost = async (id) => {
  const user = await Post.findByIdAndDelete(id);
  return user;
};

exports.searchPosts = async (filter) => {
  const posts = await Post.find(filter).populate("author categories");
  return posts;
};

exports.addCategoriesToPost = async (id, categoryIds) => {
  const post = await Post.findByIdAndUpdate(
    id,
    { $addToSet: { categories: { $each: categoryIds } } },
    { new: true }
  );
  return post;
};
