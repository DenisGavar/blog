const logger = require("../utils/logger");

const log = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = log;
