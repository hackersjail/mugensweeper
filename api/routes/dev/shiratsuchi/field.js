const router = require('express').Router();

router.route('/').get((req, res) => {
  // res.send(req.query.string);
  // const res ={x:0,y:0};

  const x = [{ x: 0, y: 0 }];
  // res.json(req.query.string);
  res.json(x);
  // console.log(req.query.string);
});

module.exports = router;
