// File: src/schemas/economySchema.js
const Joi = require('joi');

// Schema per validare i dati di un modulo economico
const economySchema = Joi.object({
  fiscalPolicy: Joi.string().valid('Flat Tax', 'Progressive Tax').required(),
  budget: Joi.number().min(0).required(),
  taxRate: Joi.number().min(0).max(100).required()
});

module.exports = { economySchema };