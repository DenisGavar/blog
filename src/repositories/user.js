const User = require("../models/user");

class UserRepository {
  constructor(logger) {
    this.logger = logger;
  }

  async create(userData) {
    const op = "repositories.user.create";
    const message = { op: op };
    this.logger.info("", message);

    const user = await User.create(userData);
    return user;
  }

  async getAllUsers() {
    const op = "repositories.user.getAllUsers";
    const message = { op: op };
    this.logger.info("", message);

    const users = await User.find().populate("authoredPosts");
    return users;
  }

  async getUser(id) {
    const op = "repositories.user.getUser";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await User.findById(id).populate("authoredPosts");
    return user;
  }

  async updateUser(id, userData) {
    const op = "repositories.user.updateUser";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, userData);
    await user.save();
    return user;
  }

  async deleteUser(id) {
    const op = "repositories.user.deleteUser";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await User.findByIdAndDelete(id);
    return user;
  }

  async getPassword(id) {
    const op = "repositories.user.getPassword";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await User.findById(id).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    const password = user.password;
    return password;
  }

  async findOne(data) {
    const op = "repositories.user.findOne";
    const message = { op: op, data: data };
    this.logger.info("", message);

    const user = await User.findOne(data);
    return user;
  }
}

module.exports = UserRepository;
