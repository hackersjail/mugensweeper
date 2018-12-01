const router = require('express').Router();

router.route('/').get((req, res) => {
  res.send([
    {
      x: 0,
      y: 0,
    },
    // ]);
    // // res.send([
    // {
    //   x: 1,
    //   y: 3,
    // },
  ]);
});

router.route('/').post((req, res) => {
  res.send([
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
