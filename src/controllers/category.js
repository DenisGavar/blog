class CategoryController {
  constructor(logger, categoryService) {
    this.categoryService = categoryService;
    this.logger = logger;

    this.createCategory = this.createCategory.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  // Create category
  async createCategory(req, res) {
    try {
      const category = await this.categoryService.create(req.body);
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
  }

  // Get all categories
  async getAllCategories(req, res) {
    try {
      const categories = await this.categoryService.getAllCategorys();
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
  }

  // Get category by ID
  async getCategory(req, res) {
    try {
      const category = await this.categoryService.getCategory(req.params.id);
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
  }

  // Update category
  async updateCategory(req, res) {
    try {
      const category = await this.categoryService.updateCategory(
        req.params.id,
        req.body
      );
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
  }

  // Delete category
  async deleteCategory(req, res) {
    try {
      const category = await this.categoryService.deleteCategory(req.params.id);
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
  }

  // TODO: it may be better to move the logic to the service level
  async getPosts(req, res) {
    try {
      const category = await this.categoryService.getCategory(req.params.id);
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
  }
}

module.exports = CategoryController;
