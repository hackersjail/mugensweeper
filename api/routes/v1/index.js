const router = require('express').Router();

router.use('/user', require('./user/user.js'));
router.use('/field', require('./field/field.js'));
router.use('/point', require('./point/individualPoint.js'));
router.use('/ranking', require('./point/ranking.js'));

module.exports = router;
