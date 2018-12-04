const router = require('express').Router();

router.route('/').post((req, res) => {
  res.json([
    {
      x: 0,
      y: 0,
    },
    {
      x: +req.body.x,
      y: +req.body.y,
    },
  ]);
});
// const field = [{ x: 0, y: 0 }];

// router.route('/').post((req, res) => {
//   if (req.body.x) {
//     field.push({ x: +req.body.x, y: +req.body.y });
//   }
//   res.json(field);
//   console.log(field);
// });

module.exports = router;
