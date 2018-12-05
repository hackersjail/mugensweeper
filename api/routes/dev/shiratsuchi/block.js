const router = require('express').Router();

let arr = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  const x = +req.body.x;
  const y = +req.body.y;
  arr.push({ x, y });
  res.json(arr);
});

router.route('/').delete((req, res) => {
  arr = [{ x: 0, y: 0 }];
  res.json(arr);
});

module.exports = router;
