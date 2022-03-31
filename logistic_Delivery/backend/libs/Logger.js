const path = require('path')
const winston = require('winston');
const { SPLAT } = require('triple-beam')
require('winston-daily-rotate-file');

const configs = require('./../configs');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.printf(log => log.stack ?
      `[${log.timestamp}] [${log.level}]: ${log.stack}` :
      `[${log.timestamp}] [${log.level}]: ${JSON.stringify(log.message)} ${log[SPLAT] ? (log[SPLAT].map(s => JSON.stringify(s))).join(" ") : ""}`
    )
  )
})

switch (process.env.NODE_ENV) {
  // case "production":
  //   logger.add(new winston.transports.DailyRotateFile({
  //     level: "info",
  //     filename: path.join(configs.LOG_FOLDER, "%DATE%.log"),
  //     zippedArchive: true,
  //     maxFiles: '14d'
  //   }))
  //   break;
  // case "release":
  //   logger.add(new winston.transports.DailyRotateFile({
  //     level: "debug",
  //     filename: path.join(configs.LOG_FOLDER, "%DATE%.log"),
  //     zippedArchive: true,
  //     maxFiles: '3d'
  //   }))
  //   break;
  default:
    logger.add(new winston.transports.Console({
      level: "debug",
      handleExceptions: true
    }))
    break;
}

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};

module.exports = logger