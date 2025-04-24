// File: src/middleware/validation.js
const Joi = require("joi");
const logger = require("../utils/logger");

// Middleware per validare i dati in ingresso
const validateInput = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    logger.error("Errore di validazione input:", error.details);
    return res
      .status(400)
      .json({ message: "Dati non validi", details: error.details });
  }

  next();
};

module.exports = { validateInput };
