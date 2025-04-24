// File: src/utils/db.js

const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const logger = require("./logger"); // Assicurati di avere un logger personalizzato

dotenv.config();

// Creazione di una connessione a PostgreSQL con Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", // Specifica il tipo di database (PostgreSQL)
  logging: false, // Disabilita il logging SQL di default, puoi abilitarlo se necessario
  pool: {
    max: 5, // Numero massimo di connessioni
    min: 0, // Numero minimo di connessioni
    acquire: 30000, // Tempo massimo per ottenere una connessione (in ms)
    idle: 10000, // Tempo massimo di inattività prima di chiudere una connessione (in ms)
  },
});

// Funzione per connettersi al database
const connectDB = async () => {
  try {
    // Tentativo di connessione al database
    await sequelize.authenticate();
    logger.info("Connessione al database PostgreSQL riuscita");
  } catch (error) {
    // In caso di errore nella connessione
    logger.error("Impossibile connettersi al database:", error);
    process.exit(1); // Uscita dal processo in caso di errore di connessione
  }
};

// Funzione per sincronizzare il database
// Può essere usata per sincronizzare il modello Sequelize con il database (prima di avviare l'app)
const syncDB = async () => {
  try {
    await sequelize.sync({ force: false }); // Imposta 'force: true' per eliminare e ricreare le tabelle ogni volta
    logger.info("Database sincronizzato correttamente");
  } catch (error) {
    logger.error("Errore durante la sincronizzazione del database:", error);
    process.exit(1); // Termina il processo se la sincronizzazione fallisce
  }
};

// Esportazione della connessione e della funzione di sincronizzazione
module.exports = {
  connectDB,
  sequelize, // Esportiamo anche l'istanza di sequelize, che può essere utilizzata per definire i modelli
  syncDB, // Funzione per sincronizzare il DB, opzionale
};
