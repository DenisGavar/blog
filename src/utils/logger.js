const winston = require("winston");

const myFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} [${level}]: ${message} ${meta? JSON.stringify(meta) : ''}`;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
