const User = require("../models/user");

exports.create = async (userData) => {
  const user = await User.create(userData);
  return user;
};

exports.getAllUsers = async () => {
  const users = await User.find().populate("authoredPosts");
  return users;
};

exports.getUser = async (id) => {
  const user = await User.findById(id).populate("authoredPosts");
  return user;
};

exports.updateUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

exports.getUserByUsername = async (username) => {
  const user = await User.findOne({ username: username });
  return user;
};
