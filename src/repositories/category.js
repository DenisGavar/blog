const Category = require("../models/category");

class CategoryRepository {
  constructor(logger) {
    this.logger = logger;
  }

  async create(categoryData) {
    const category = await Category.create(categoryData);
    return category;
  }

  async getAllCategorys() {
    const categorys = await Category.find().populate("posts");
    return categorys;
  }

  async getCategory(id) {
    const category = await Category.findById(id).populate("posts");
    return category;
  }

  async updateCategory(id, categoryData) {
    const category = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
      runValidators: true,
    });
    return category;
  }

  async deleteCategory(id) {
    const category = await Category.findByIdAndDelete(id);
    return category;
  }

  async findCategoriesByIds(ids) {
    const categories = await Category.find({ _id: { $in: ids } });
    return categories;
  }

  async getCategoryByName(category) {
    const categoryDoc = await Category.findOne({ name: category });
    return categoryDoc;
  }
}

module.exports = CategoryRepository;
