const router = require('express').Router();

router.use('/example', require('./example.js'));

module.exports = router;
