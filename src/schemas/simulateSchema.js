// File: src/schemas/simulateSchema.js
const Joi = require('joi');

// Schema per validare i dati di una simulazione
const simulateSchema = Joi.object({
  country: Joi.string().valid('Italy').required(), // Solo "Italy" è permesso per ora
  domain: Joi.string().valid('Economia', 'Sociale').required(), // Domini validi
  proposals: Joi.array().items(Joi.string()).required(), // Lista di proposte
  constraints: Joi.array().items(Joi.string()).required() // Lista di vincoli
});

module.exports = { simulateSchema };
