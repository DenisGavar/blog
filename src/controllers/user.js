class UserController {
  constructor(logger, userService) {
    this.userService = userService;
    this.logger = logger;

    this.createUser = this.createUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.signIn = this.signIn.bind(this);
    this.requestPasswordReset = this.requestPasswordReset.bind(this);
    this.passwordReset = this.passwordReset.bind(this);
  }

  // Create user
  async createUser(req, res) {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get user by ID
  async getUser(req, res) {
    try {
      const user = await this.userService.getUser(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ status: "fail", message: "User not found" });
      }
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Update user
  async updateUser(req, res) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res
          .status(404)
          .json({ status: "fail", message: "User not found" });
      }
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ status: "fail", message: "User not found" });
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

  async signIn(req, res) {
    try {
      const { username, password } = req.body;
      const { user, token } = await this.userService.signIn(username, password);
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.status(401).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      const resetToken = await this.userService.createPasswordResetToken(email);

      if (!resetToken) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      // Send email with the resetToken as part of a link
      await this.userService.sendResetEmail(email, resetToken);

      res.status(200).json({
        status: "success",
        message: "Password reset link has been sent to your email.",
      });
    } catch (err) {
      this.logger.error(err);
      res.status(500).json({
        status: "fail",
        message: "An error occurred while processing your request.",
      });
    }
  }

  async passwordReset(req, res) {
    try {
      const { newPassword } = req.body;
      const token = req.params.token;

      const user = await this.userService.passwordReset(token, newPassword);

      if (!user) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid or expired token",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Password has been updated successfully.",
      });
    } catch (err) {
      this.logger.error(err);
      res.status(500).json({
        status: "fail",
        message: "An error occurred while processing your request.",
      });
    }
  }
}

module.exports = UserController;
