// File: src/server.js
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const simulateRoutes = require("./routes/simulate");
const authRoutes = require("./routes/auth");
const { errorHandler } = require("./middleware/errorHandler");
const { connectDB } = require("./utils/db");

// Carica le variabili d'ambiente dal file .env
dotenv.config();

// Crea l'app Express
const app = express();

// Porta su cui il server ascolta
const PORT = process.env.PORT || 3000;

// Middleware di parsing del corpo della richiesta
app.use(express.json());

// Connessione al database (PostgreSQL, usando Sequelize)
connectDB();

// Rotte
app.use("/api", simulateRoutes); // Rotte per la simulazione
app.use("/api/auth", authRoutes); // Rotte per l'autenticazione

// Middleware per la gestione degli errori globali
app.use(errorHandler);

// Avvio del server
app.listen(PORT, () => {
  logger.info(`Server in ascolto sulla porta ${PORT}`);
});
