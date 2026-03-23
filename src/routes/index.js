const router = require('express').Router();

router.use('/config', require('./config'));

module.exports = router;
