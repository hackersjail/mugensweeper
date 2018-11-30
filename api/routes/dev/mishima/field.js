const router = require('express').Router();

const field = [{ x: 0, y: 0 }];

router.route('/field').get((req, res) => {
  console.log(field);
  res.json(field);
});

module.exports = router;
