// File: utils/ethicsValidator.js
const fs = require("fs");
const path = require("path");

// Funzione mock per la validazione delle regole etiche
const validateEthics = (simulationResult) => {
  const rulesPath = path.join(__dirname, "../ethics/ruleset_it.json");
  const rules = JSON.parse(fs.readFileSync(rulesPath, "utf8")).rules;

  // Simulazione della validazione (da implementare logicamente)
  const valid = simulationResult.constraints.every((constraint) => {
    return rules.includes(constraint);
  });

  return valid
    ? {
        status: "valid",
        message: "La simulazione è conforme alle regole etiche.",
      }
    : {
        status: "invalid",
        message: "La simulazione non rispetta tutte le regole etiche.",
      };
};

module.exports = { validateEthics };
