const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/miyamoto/field', require('./miyamoto/field.js'));

module.exports = router;
