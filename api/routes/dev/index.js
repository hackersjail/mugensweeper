const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/ryoko/field', require('./ryoko/field.js'));
router.use('/ryoko/block', require('./ryoko/block.js'));
router.use('/rennie/field', require('./rennie/field.js'));
router.use('/rennie/block', require('./rennie/field.js'));
router.use('/eto/field', require('./eto/field.js'));
router.use('/miyamoto/field', require('./miyamoto/field.js'));
router.use('/miyamoto/block', require('./miyamoto/block.js'));
router.use('/matsuda/field', require('./matsuda/field.js'));
router.use('/mishima/field', require('./mishima/field.js'));
router.use('/mishima/block', require('./mishima/block.js'));

router.use('/eto/block', require('./eto/block.js'));

module.exports = router;
