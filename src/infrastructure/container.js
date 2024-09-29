const UserRepository = require("../repositories/user");
const PostRepository = require("../repositories/post");
const CategoryRepository = require("../repositories/category");
const UserService = require("../services/user");
const PostService = require("../services/post");
const CategoryService = require("../services/category");

const container = {
  userRepository: new UserRepository(),
  postRepository: new PostRepository(),
  categoryRepository: new CategoryRepository(),
};

container.userService = new UserService(container.userRepository);
container.postService = new PostService(
  container.postRepository,
  container.userRepository,
  container.categoryRepository
);
container.categoryService = new CategoryService(container.categoryRepository);

module.exports = container;
