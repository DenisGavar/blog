class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async create(categoryData) {
    const category = await this.categoryRepository.create(categoryData);
    return category;
  }

  async getAllCategorys() {
    const categorys = await this.categoryRepository.getAllCategorys();
    return categorys;
  }

  async getCategory(id) {
    const category = await this.categoryRepository.getCategory(id);
    return category;
  }

  async updateCategory(id, categoryData) {
    const category = await this.categoryRepository.updateCategory(id, categoryData);
    return category;
  }

  async deleteCategory(id) {
    const category = await this.categoryRepository.deleteCategory(id);
    return category;
  }
}

module.exports = CategoryService;
