class CategoryService {
  constructor(logger, categoryRepository) {
    this.categoryRepository = categoryRepository;
    this.logger = logger;
  }

  async create(categoryData) {
    const op = "services.category.create";
    const message = { op: op };
    this.logger.info("", message);

    const category = await this.categoryRepository.create(categoryData);
    return category;
  }

  async getAllCategorys() {
    const op = "services.category.getAllCategorys";
    const message = { op: op };
    this.logger.info("", message);

    const categorys = await this.categoryRepository.getAllCategorys();
    return categorys;
  }

  async getCategory(id) {
    const op = "services.category.getCategory";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await this.categoryRepository.getCategory(id);
    return category;
  }

  async updateCategory(id, categoryData) {
    const op = "services.category.updateCategory";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await this.categoryRepository.updateCategory(
      id,
      categoryData
    );
    return category;
  }

  async deleteCategory(id) {
    const op = "services.category.deleteCategory";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await this.categoryRepository.deleteCategory(id);
    return category;
  }
}

module.exports = CategoryService;
