const router = require('express').Router();

const position = [];

router.route('/').post((req, res) => {
  // POSTした座標を配列に追加する
  if (position.length !== 0) {
    position.push({
      x: Number(req.body.x),
      y: Number(req.body.y),
    });
  } else {
    position.push({
      x: 0,
      y: 0,
    });
    position.push({
      x: Number(req.body.x),
      y: Number(req.body.y),
    });
  }
  res.send(position);
});

module.exports = router;
