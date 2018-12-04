const router = require('express').Router();

const field = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  if (req.body.x) {
    for (let i = 0; i < field.length; i += 1) {
      // console.log(field[i].x, req.body.x, field[i].y, req.body.y);
      if (field[i].x === Number(req.body.x) && field[i].y === Number(req.body.y)) {
        break;
      } else if (i === field.length - 1) {
        field.push({ x: Number(req.body.x), y: Number(req.body.y) });
      }
    }
  }
  res.json(field);
});

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

module.exports = router;
