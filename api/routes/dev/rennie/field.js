const router = require('express').Router();

const field = [{ x: 0, y: 0 }];
router.route('/').get((req, res) => {
  res.send(field);
});

module.exports = router;
