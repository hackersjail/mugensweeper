const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/rennie/field', require('./rennie/field.js'));

module.exports = router;
