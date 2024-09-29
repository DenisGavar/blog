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
}

module.exports = UserService;
