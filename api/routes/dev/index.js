const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/ryoko/field', require('./ryoko/field.js'));
router.use('/rennie/field', require('./rennie/field.js'));
router.use('/eto/field', require('./eto/field.js'));
router.use('/miyamoto/field', require('./miyamoto/field.js'));
router.use('/miyamoto/block', require('./miyamoto/block.js'));
router.use('/matsuda/field', require('./matsuda/field.js'));
router.use('/mishima', require('./mishima/field.js'));

module.exports = router;
