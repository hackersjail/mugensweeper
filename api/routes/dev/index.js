const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/miyamoto', require('./miyamoto.js'));

module.exports = router;
