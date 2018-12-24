const router = require('express').Router();
const auth = require('../v1/authentication/auth.js')();

router.use('/user_id_generate', require('./miyamoto/user_id_generate.js'));

router.use('/example', require('./example.js'));
router.use('/ryoko/field', require('./ryoko/field.js'));
router.use('/ryoko/block', require('./ryoko/block.js'));
router.use('/rennie/field', require('./rennie/field.js'));
router.use('/rennie/block', require('./rennie/block.js'));
router.use('/eto/field', require('./eto/field.js'));
router.use('/eto/block', require('./eto/block.js'));
router.use('/miyamoto/field', auth.authenticate(), require('./miyamoto/field.js'));
router.use('/miyamoto/block', auth.authenticate(), require('./miyamoto/block.js'));
router.use('/matsuda/field', require('./matsuda/field.js'));
router.use('/mishima/field', require('./mishima/field.js'));
router.use('/mishima/block', require('./mishima/block.js'));
router.use('/eto/block', require('./eto/block.js'));
router.use('/hiro/field', require('./hiro/field.js'));
router.use('/shiratsuchi/field', require('./shiratsuchi/field.js'));
router.use('/shiratsuchi/block', require('./shiratsuchi/block.js'));

module.exports = router;
