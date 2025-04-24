// File: src/middleware/authentication.js
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

// Middleware per verificare il JWT
const validateJwt = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assumiamo "Bearer <token>"

  if (!token) {
    logger.error("Token non fornito");
    return res.status(403).json({ message: "Accesso negato: token mancante" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.error("Token non valido", err);
      return res
        .status(403)
        .json({ message: "Accesso negato: token non valido" });
    }

    // Salva le informazioni decodificate nel body della richiesta per usarle successivamente
    req.user = decoded;
    next();
  });
};

module.exports = { validateJwt };
