const router = require('express').Router();

const field = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  if (req.body.x) {
    field.push({ x: Number(req.body.x), y: Number(req.body.y) });
  }
  if (req.query.x) {
    field.push({ x: Number(req.query.x), y: Number(req.query.y) });
  }
  res.json(field);
  console.log(field);
});

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
  console.log('☆');
});

module.exports = router;
