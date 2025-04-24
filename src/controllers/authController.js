// File: src/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const logger = require("../utils/logger");

// Funzione per il login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trova l'utente nel DB
    const user = await User.findOne({ where: { email } });

    if (!user) {
      logger.warn("Utente non trovato");
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Confronta la password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      logger.warn("Password errata");
      return res.status(401).json({ message: "Password errata" });
    }

    // Crea il token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    logger.info("Login effettuato con successo");

    // Rispondi con il token
    res.status(200).json({
      message: "Login riuscito",
      token,
    });
  } catch (err) {
    logger.error("Errore durante il login:", err);
    res.status(500).json({
      message: "Errore interno del server durante il login",
      error: err.message,
    });
  }
};

module.exports = {
  login,
};
