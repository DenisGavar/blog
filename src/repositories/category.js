const Category = require("../models/category");

class CategoryRepository {
  constructor(logger) {
    this.logger = logger;
  }

  async create(categoryData) {
    const op = "repositories.category.create";
    const message = { op: op };
    this.logger.info("", message);

    const category = await Category.create(categoryData);
    return category;
  }

  async getAllCategorys() {
    const op = "repositories.category.getAllCategorys";
    const message = { op: op };
    this.logger.info("", message);

    const categorys = await Category.find().populate("posts");
    return categorys;
  }

  async getCategory(id) {
    const op = "repositories.category.getCategory";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await Category.findById(id).populate("posts");
    return category;
  }

  async updateCategory(id, categoryData) {
    const op = "repositories.category.updateCategory";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
      runValidators: true,
    });
    return category;
  }

  async deleteCategory(id) {
    const op = "repositories.category.deleteCategory";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await Category.findByIdAndDelete(id);
    return category;
  }

  async findCategoriesByIds(ids) {
    const op = "repositories.category.findCategoriesByIds";
    const message = { op: op, ids: ids };
    this.logger.info("", message);

    const categories = await Category.find({ _id: { $in: ids } });
    return categories;
  }

  async findOne(data) {
    const op = "repositories.category.findOne";
    const message = { op: op, data: data };
    this.logger.info("", message);

    const category = await Category.findOne(data);
    return category;
  }
}

module.exports = CategoryRepository;
