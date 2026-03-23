const router = require('express').Router();
const controller = require('../controllers/expenses');

router.post('/', controller.createExpense);

module.exports = router;
