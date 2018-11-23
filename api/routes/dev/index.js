const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/shiratsuchi/field', require('./shiratsuchi/field.js'));

module.exports = router;
