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
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({ username: username });
    return user;
  }
}

module.exports = UserRepository;
