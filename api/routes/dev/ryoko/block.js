const router = require('express').Router();

const field = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  if (req.body.x) {
    field.push({ x: Number(req.body.x), y: Number(req.body.y) });
  }
  res.json(field);
});

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

module.exports = router;
