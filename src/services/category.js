const categoryRepository = require("../repositories/category");

exports.create = async (categoryData) => {
  const category = await categoryRepository.create(categoryData);
  return category;
};

exports.getAllCategorys = async () => {
  const categorys = await categoryRepository.getAllCategorys();
  return categorys;
};

exports.getCategory = async (id) => {
  const category = await categoryRepository.getCategory(id);
  return category;
};

exports.updateCategory = async (id, categoryData) => {
  const category = await categoryRepository.updateCategory(id, categoryData);
  return category;
};

exports.deleteCategory = async (id) => {
  const category = await categoryRepository.deleteCategory(id);
  return category;
};
