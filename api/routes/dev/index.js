const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/ryoko/field', require('./ryoko/field.js'));
// //
module.exports = router;
