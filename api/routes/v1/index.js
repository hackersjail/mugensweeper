const router = require('express').Router();

router.use('/user', require('./user/user.js'));
router.use('/field', require('./field/field.js'));

module.exports = router;
