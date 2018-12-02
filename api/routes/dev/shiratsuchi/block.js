const router = require('express').Router();

router.route('/').post((req, res) => {
  const x = +req.body.x;
  const y = +req.body.y;

  res.send([{ x, y }, { x: 0, y: 0 }]);
});

module.exports = router;
