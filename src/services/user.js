const userRepository = require("../repositories/user");

exports.create = async (userData) => {
  const user = await userRepository.create(userData);
  return user;
};

exports.getAllUsers = async () => {
  const users = await userRepository.getAllUsers();
  return users;
};

exports.getUser = async (id) => {
  const user = await userRepository.getUser(id);
  return user;
};

exports.updateUser = async (id, userData) => {
  const user = await userRepository.updateUser(id, userData);
  return user;
};

exports.deleteUser = async (id) => {
  const user = await userRepository.deleteUser(id);
  return user;
};
