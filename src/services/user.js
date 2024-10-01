const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const sendEmail = require("../utils/email");

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
    const user = await this.userRepository.findOne({ username: username });
    if (
      !user ||
      !(await bcrypt.compare(
        password,
        await this.userRepository.getPassword(user._id)
      ))
    ) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { user, token };
  }

  async createPasswordResetToken(email) {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      return null;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    await this.userRepository.updateUser(user._id, {
      passwordResetToken: resetTokenHash,
      passwordResetExpires: passwordResetExpires,
    });

    return resetToken;
  }

  async sendResetEmail(email, resetToken) {
    const resetURL = `http://localhost:5000/api/v1/password/reset/${resetToken}`;
    sendEmail(email, "Password reset link", resetURL);
  }

  async passwordReset(token, newPassword) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await this.userRepository.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return null;
    }

    const updatedUser = await this.userRepository.updateUser(user._id, {
      password: newPassword,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    });
    return updatedUser;
  }
}

module.exports = UserService;
