// File: src/controllers/simulateController.js
const { Simulation, Module, Agent } = require("../models");
const logger = require("../utils/logger");

// Funzione per avviare la simulazione
const simulate = async (req, res) => {
  try {
    const { country, domain, proposals, constraints } = req.body;

    // Crea una nuova simulazione nel DB
    const simulation = await Simulation.create({
      country,
      domain,
      proposals,
      constraints,
      result: null, // I risultati verranno popolati successivamente
    });

    logger.info(
      `Simulazione avviata per il paese ${country}, dominio ${domain}`
    );

    // Esegui i moduli (per esempio, "economia" e "sociale")
    const modules = await Module.findAll({
      where: { country, domain },
    });

    const agents = await Agent.findAll();

    // Esegui la logica di simulazione usando i moduli e gli agenti
    const results = await runSimulation(
      modules,
      agents,
      proposals,
      constraints
    );

    // Salva i risultati della simulazione nel DB
    simulation.result = results;
    await simulation.save();

    logger.info("Simulazione completata con successo");

    // Rispondi con i risultati della simulazione
    res.status(200).json({
      message: "Simulazione completata",
      simulationId: simulation.id,
      results,
    });
  } catch (err) {
    logger.error("Errore durante l'esecuzione della simulazione:", err);
    res.status(500).json({
      message: "Errore interno del server durante la simulazione",
      error: err.message,
    });
  }
};

// Funzione fittizia per eseguire la simulazione
const runSimulation = async (modules, agents, proposals, constraints) => {
  // Mock logic
  return {
    status: "Successo",
    proposals,
    constraints,
    evaluation: "Positiva",
  };
};

module.exports = {
  simulate,
};
