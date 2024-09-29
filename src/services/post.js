const postRepository = require("../repositories/post");
const userRepository = require("../repositories/user");
const categoryRepository = require("../repositories/category");

exports.create = async (postData) => {
  const post = await postRepository.create(postData);
  return post;
};

exports.getAllPosts = async () => {
  const posts = await postRepository.getAllPosts();
  return posts;
};

exports.getPost = async (id) => {
  const post = await postRepository.getPost(id);
  return post;
};

exports.updatePost = async (id, postData) => {
  const post = await postRepository.updatePost(id, postData);
  return post;
};

exports.deletePost = async (id) => {
  const post = await postRepository.deletePost(id);
  return post;
};

const validateUser = async (username) => {
  const user = await userRepository.getUserByUsername(username);

  if (!user) {
    throw new Error("Author not found");
  }
  return user;
};

const validateCategory = async (category) => {
  const categoryDoc = await categoryRepository.getCategoryByName(category);

  if (!categoryDoc) {
    throw new Error("Category not found");
  }
  return categoryDoc;
};

exports.searchPosts = async (query) => {
  const { title, author, category } = query;

  let filter = {};

  if (title) {
    filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
  }

  if (author) {
    const user = await validateUser(author);
    filter.author = user._id;
  }

  if (category) {
    const categoryDoc = await validateCategory(category);
    filter.categories = categoryDoc._id;
  }

  const posts = await postRepository.searchPosts(filter);
  return posts;
};

const validateCategories = async (ids) => {
  const categories = await categoryRepository.findCategoriesByIds(ids);
  if (categories.length !== ids.length) {
    throw new Error("One or more categories not found");
  }
};

exports.addCategoriesToPost = async (id, categoryIds) => {
  const categoriesArray = categoryIds.split(",");
  await validateCategories(categoriesArray);

  const post = await postRepository.addCategoriesToPost(id, categoriesArray);
  return post;
};
