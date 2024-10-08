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
    const op = "services.user.create";
    const message = { op: op };
    this.logger.info("", message);

    const user = await this.userRepository.create(userData);
    return user;
  }

  async getAllUsers() {
    const op = "services.user.getAllUsers";
    const message = { op: op };
    this.logger.info("", message);

    const users = await this.userRepository.getAllUsers();
    return users;
  }

  async getUser(id) {
    const op = "services.user.getUser";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await this.userRepository.getUser(id);
    return user;
  }

  async updateUser(id, userData) {
    const op = "services.user.updateUser";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await this.userRepository.updateUser(id, userData);
    return user;
  }

  async deleteUser(id) {
    const op = "services.user.deleteUser";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const user = await this.userRepository.deleteUser(id);
    return user;
  }

  async signIn(username, password) {
    const op = "services.user.signIn";
    const message = { op: op, username: username };
    this.logger.info("", message);

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
    const op = "services.user.createPasswordResetToken";
    const message = { op: op, email: email };
    this.logger.info("", message);

    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
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
    const op = "services.user.sendResetEmail";
    const message = { op: op, email: email };
    this.logger.info("", message);

    const resetURL = `http://localhost:5000/api/v1/password/reset/${resetToken}`;
    sendEmail(email, "Password reset link", resetURL);
  }

  async passwordReset(token, newPassword) {
    const op = "services.user.passwordReset";
    const message = { op: op };
    this.logger.info("", message);

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await this.userRepository.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("User not found");
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
