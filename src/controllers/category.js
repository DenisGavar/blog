const categoryService = require("../services/category");

// Create category
exports.createCategory = async (req, res) => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategorys();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get category by ID
exports.getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategory(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// TODO: it may be better to move the logic to the service level
exports.getPosts = async (req, res) => {
  try {
    const category = await categoryService.getCategory(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        posts: category.posts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
