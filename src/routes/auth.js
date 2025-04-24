// File: src/routes/auth.js
const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();

// Rotta POST per il login
router.post("/login", login);

module.exports = router;
