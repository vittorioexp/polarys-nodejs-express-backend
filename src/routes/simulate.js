// File: src/routes/simulate.js
const express = require("express");
const { simulate } = require("../controllers/simulateController");
const { validateJwt } = require("../middleware/authentication");
const { validateInput } = require("../middleware/validation");
const { simulateSchema } = require("../schemas/simulateSchema");
const router = express.Router();

// Rotta POST per avviare la simulazione
router.post("/simulate", validateJwt, validateInput(simulateSchema), simulate);

module.exports = router;
