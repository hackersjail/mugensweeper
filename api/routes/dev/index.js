const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/mishima', require('./mishima/field.js'));

module.exports = router;
