class PostService {
  constructor(logger, postRepository, userRepository, categoryRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
    this.logger = logger;
  }

  async create(postData) {
    const op = "services.post.create";
    const message = { op: op };
    this.logger.info("", message);

    const post = await this.postRepository.create(postData);
    return post;
  }

  async getAllPosts() {
    const op = "services.post.getAllPosts";
    const message = { op: op };
    this.logger.info("", message);

    const posts = await this.postRepository.getAllPosts();
    return posts;
  }

  async getPost(id) {
    const op = "services.post.getPost";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const post = await this.postRepository.getPost(id);
    return post;
  }

  async updatePost(id, postData) {
    const op = "services.post.updatePost";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const post = await this.postRepository.updatePost(id, postData);
    return post;
  }

  async deletePost(id) {
    const op = "services.post.deletePost";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const post = await this.postRepository.deletePost(id);
    return post;
  }

  // Checking that user exists
  async validateUser(username) {
    const op = "services.post.validateUser";
    const message = { op: op, username: username };
    this.logger.info("", message);

    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new Error("Author not found");
    }
    return user;
  }

  // Checking that the category exists
  async validateCategory(name) {
    const op = "services.post.validateCategory";
    const message = { op: op, name: name };
    this.logger.info("", message);

    const category = await this.categoryRepository.findOne({
      name: name,
    });

    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async searchPosts(query) {
    const op = "services.post.searchPosts";
    const message = { op: op, query: query };
    this.logger.info("", message);

    const { title, author, category } = query;

    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    if (author) {
      const user = await this.validateUser(author);
      filter.author = user._id;
    }

    if (category) {
      const categoryDoc = await this.validateCategory(category);
      filter.categories = categoryDoc._id;
    }

    const posts = await this.postRepository.searchPosts(filter);
    return posts;
  }

  // Checking that all categories exist
  async validateCategories(ids) {
    const op = "services.post.validateCategories";
    const message = { op: op, ids: ids };
    this.logger.info("", message);

    const categories = await this.categoryRepository.findCategoriesByIds(ids);
    if (categories.length !== ids.length) {
      throw new Error("One or more categories not found");
    }
  }

  async addCategoriesToPost(id, categoryIds) {
    const op = "services.post.addCategoriesToPost";
    const message = { op: op, id: id, categoryIds: categoryIds };
    this.logger.info("", message);

    const categoriesArray = categoryIds.split(",");
    await this.validateCategories(categoriesArray);

    const post = await this.postRepository.addCategoriesToPost(
      id,
      categoriesArray
    );
    return post;
  }
}

module.exports = PostService;
