class PostService {
  constructor(logger, postRepository, userRepository, categoryRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
    this.logger = logger;
  }

  async create(postData) {
    const post = await this.postRepository.create(postData);
    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.getAllPosts();
    return posts;
  }

  async getPost(id) {
    const post = await this.postRepository.getPost(id);
    return post;
  }

  async updatePost(id, postData) {
    const post = await this.postRepository.updatePost(id, postData);
    return post;
  }

  async deletePost(id) {
    const post = await this.postRepository.deletePost(id);
    return post;
  }

  async validateUser(username) {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new Error("Author not found");
    }
    return user;
  }

  async validateCategory(category) {
    const categoryDoc = await this.categoryRepository.getCategoryByName(category);

    if (!categoryDoc) {
      throw new Error("Category not found");
    }
    return categoryDoc;
  }

  async searchPosts(query) {
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

  async validateCategories(ids) {
    const categories = await this.categoryRepository.findCategoriesByIds(ids);
    if (categories.length !== ids.length) {
      throw new Error("One or more categories not found");
    }
  }

  async addCategoriesToPost(id, categoryIds) {
    const categoriesArray = categoryIds.split(",");
    await this.validateCategories(categoriesArray);

    const post = await this.postRepository.addCategoriesToPost(id, categoriesArray);
    return post;
  }
}

module.exports = PostService;
