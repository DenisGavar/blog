const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Ensure the password field is not returned in queries
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  favoritePosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

// Virtual field to get all posts authored by the user
userSchema.virtual("authoredPosts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

// Password hashing middleware before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
