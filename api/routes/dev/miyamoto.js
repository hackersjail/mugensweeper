const router = require('express').Router();

router.use('/field', require('./miyamoto/field.js'));

module.exports = router;
