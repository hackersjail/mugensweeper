const router = require('express').Router();

// field testのぶん

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
module.exports = router;
