const authMiddleware = require('../middleware/auth');

const router = require('express').Router();

router.use(authMiddleware);
router.use('/config', require('./config'));
router.use('/expenses', require('./expenses'));

module.exports = router;
