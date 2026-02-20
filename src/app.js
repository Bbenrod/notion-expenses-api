const express = require("express");

const app = express();

// Middlewares
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes

module.exports = app;
