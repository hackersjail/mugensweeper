const router = require('express').Router();

router.route('/').post((req, res) => {
  // POSTした座標を配列に追加する
  body.push({
    x: Number(req.body.x),
    y: Number(req.body.y),
  });
  res.send(body);
});

module.exports = router;
