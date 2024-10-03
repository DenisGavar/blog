const logger = require("../utils/logger");

const log = (req, res, next) => {
  const message = { method: req.method, url: req.url };
  logger.info("", message);
  next();
};

module.exports = log;
