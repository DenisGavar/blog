const Category = require("../models/category");

exports.create = async (categoryData) => {
  const category = await Category.create(categoryData);
  return category;
};

exports.getAllCategorys = async () => {
  const categorys = await Category.find().populate("posts");
  return categorys;
};

exports.getCategory = async (id) => {
  const category = await Category.findById(id).populate("posts");
  return category;
};

exports.updateCategory = async (id, categoryData) => {
  const category = await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
    runValidators: true,
  });
  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  return category;
};

exports.findCategoriesByIds = async (ids) => {
  const categories = await Category.find({ _id: { $in: ids } });
  return categories;
};

exports.getCategoryByName = async (category) => {
  const categoryDoc = await Category.findOne({ name: category });
  return categoryDoc;
};
