const User = require("../models/user");

class UserRepository {
  constructor(logger) {
    this.logger = logger;
  }

  async create(userData) {
    const user = await User.create(userData);
    return user;
  }

  async getAllUsers() {
    const users = await User.find().populate("authoredPosts");
    return users;
  }

  async getUser(id) {
    const user = await User.findById(id).populate("authoredPosts");
    return user;
  }

  async updateUser(id, userData) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, userData);
    await user.save();
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  async getPassword(id) {
    const user = await User.findById(id).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    const password = user.password;
    return password;
  }

  async findOne(data) {
    const user = await User.findOne(data);
    return user;
  }
}

module.exports = UserRepository;
