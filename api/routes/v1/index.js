const router = require('express').Router();

router.use('/user', require('./user/user.js'));

module.exports = router;
