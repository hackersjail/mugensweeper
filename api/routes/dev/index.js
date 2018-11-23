const router = require('express').Router();

router.use('/example', require('./example.js'));

router.use('/hiro/field', require('../hiro/field.js'));
//
module.exports = router;
