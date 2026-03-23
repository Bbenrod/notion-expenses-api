const service = require('../services/expenses');

const createExpense = async (req, res) => {
  try {
    const result = await service.createExpense(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error in createExpense:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

module.exports = { createExpense };
