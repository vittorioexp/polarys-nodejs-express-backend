// File: src/models/index.js
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// Connessione al database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Disabilita il logging delle query SQL
  define: {
    freezeTableName: true, // Non modifica i nomi delle tabelle
  },
});

// Carica i modelli dalla cartella 'models'
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Sincronizza i modelli con il database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database sincronizzato");
  })
  .catch((error) => {
    console.error("Errore nella sincronizzazione del database:", error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
