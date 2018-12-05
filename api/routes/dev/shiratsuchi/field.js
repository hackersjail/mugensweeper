const router = require('express').Router();

router.route('/').get((req, res) => {
  res.json([{ x: 0, y: 0 }]);
});

module.exports = router;
