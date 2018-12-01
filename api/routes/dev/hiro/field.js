const router = require('express').Router();

console.log('field.js');
router.route('/').get((req, res) => {
  res.send([{ x: 0, y: 0 }]);
});

module.exports = router;
