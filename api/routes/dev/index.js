const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/eto/field', require('./eto/field.js'));
module.exports = router;

