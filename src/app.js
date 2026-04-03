const express = require('express');
const routes = require('./routes');
const authMiddleware = require('./middleware/auth');

const app = express();

// Middlewares
app.use(express.json());
app.use(authMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use(routes);

module.exports = app;
