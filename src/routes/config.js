const router = require('express').Router();
const controller = require('../controllers/config');

router.get('/', controller.getConfig);

module.exports = router;
