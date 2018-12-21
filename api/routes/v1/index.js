const router = require('express').Router();

router.use('/user', require('./user/user.js'));
router.use('/user_name', require('./user/userName.js'));

module.exports = router;
