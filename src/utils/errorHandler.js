// File: src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Errore interno del server" });
};

module.exports = { errorHandler };
