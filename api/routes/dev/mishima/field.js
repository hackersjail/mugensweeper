const router = require('express').Router();

let field = [{ x: 0, y: 0 }];
const reset = () => {
  field = [{ x: 0, y: 0, opened: true, hasBomb: false }];
  return field;
};

router.route('/field/reset').get((req, res) => {
  res.json(reset());
});

router.route('/block').post((req, res) => {
  field = [{ x: +req.body.x, y: +req.body.y }, { x: 0, y: 0 }];
  res.json(field);
});

module.exports = router;
