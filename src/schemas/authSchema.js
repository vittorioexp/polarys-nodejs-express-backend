// File: src/schemas/authSchema.js
const Joi = require('joi');

// Schema per validare i dati di login/registrazione
const authSchema = Joi.object({
  email: Joi.string().email().required(), // Validazione dell'email
  password: Joi.string().min(6).required() // La password deve avere almeno 6 caratteri
});

module.exports = { authSchema };