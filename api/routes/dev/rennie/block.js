const router = require('express').Router();

// field testのぶん

// router.route('/').post((req, res) => {
//   res.json([
//     {
//       x: 0,
//       y: 0,
//     },
//     {
//       x: +req.body.x,
//       y: +req.body.y,
//     },
//   ]);
// });

// block テスト一番め
const field = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  if (req.body.x) {
    field.push({ x: +req.body.x, y: +req.body.y });
  }
  res.json(field);
});
router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

module.exports = router;
