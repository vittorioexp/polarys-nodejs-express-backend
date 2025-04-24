// File: src/utils/logger.js
const winston = require("winston");

// Configurazione del logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", // Imposta il livello di log da .env
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log sulla console
    new winston.transports.File({ filename: "logs/app.log" }), // Log su file
  ],
});

module.exports = logger;
