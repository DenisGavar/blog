const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  constructor(logger, userRepository) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async create(userData) {
    const user = await this.userRepository.create(userData);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  async getUser(id) {
    const user = await this.userRepository.getUser(id);
    return user;
  }

  async updateUser(id, userData) {
    const user = await this.userRepository.updateUser(id, userData);
    return user;
  }

  async deleteUser(id) {
    const user = await this.userRepository.deleteUser(id);
    return user;
  }

  async signIn(username, password) {
    const user = await this.userRepository.getUserByUsername(username);
    if (
      !user ||
      !(await bcrypt.compare(password, await this.userRepository.getPassword(user._id)))
    ) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { user, token };
  }
}

module.exports = UserService;
