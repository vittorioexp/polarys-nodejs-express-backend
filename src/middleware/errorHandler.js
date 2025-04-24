// File: src/middleware/errorHandler.js
const logger = require("../utils/logger");

// Middleware per la gestione globale degli errori
const errorHandler = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message}`);

  // Restituisce una risposta uniforme
  res.status(err.status || 500).json({
    message: err.message || "Errore interno del server",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
