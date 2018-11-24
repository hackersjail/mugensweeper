const router = require('express').Router();

router.use('/example', require('./example.js'));
router.use('/matsuda/field', require('./matsuda/field.js'));
// コンフリクトを発生させるためだけのコメント

module.exports = router;
