const UserRepository = require("../repositories/user");
const PostRepository = require("../repositories/post");
const CategoryRepository = require("../repositories/category");
const UserService = require("../services/user");
const PostService = require("../services/post");
const CategoryService = require("../services/category");
const UserController = require("../controllers/user");
const PostController = require("../controllers/post");
const CategoryController = require("../controllers/category");
const logger = require("../utils/logger");

const container = {
  userRepository: new UserRepository(logger),
  postRepository: new PostRepository(logger),
  categoryRepository: new CategoryRepository(logger),
};

container.userService = new UserService(logger, container.userRepository);
container.postService = new PostService(
  logger,
  container.postRepository,
  container.userRepository,
  container.categoryRepository
);
container.categoryService = new CategoryService(
  logger,
  container.categoryRepository
);

container.userController = new UserController(logger, container.userService);
container.postController = new PostController(logger, container.postService);
container.categoryController = new CategoryController(
  logger,
  container.categoryService
);

module.exports = container;
