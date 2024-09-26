const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

// Virtual field to populate all posts in this category
categorySchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "categories",
});

module.exports = mongoose.model("Category", categorySchema);
