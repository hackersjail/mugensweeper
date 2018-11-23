const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/matsuda/field', require('./matsuda/field.js'));
router.use('/mishima', require('./mishima/field.js'));

module.exports = router;
