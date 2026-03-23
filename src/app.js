const express = require('express');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use(routes);

module.exports = app;
