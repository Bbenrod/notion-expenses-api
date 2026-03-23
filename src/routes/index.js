const router = require('express').Router();

router.use('/config', require('./config'));
router.use('/expenses', require('./expenses'));

module.exports = router;
