const router = require('express').Router();

const field = [{ x: 0, y: 0 }];

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

router.route('/').post((req, res) => {
  const fieldIdx = field.findIndex((elem) => {
    if (elem.x === +req.body.x && elem.y === +req.body.y) {
      return true;
    }
    return false;
  });

  if (fieldIdx === -1) {
    field.push({ x: +req.body.x, y: +req.body.y });
  }

  res.json(field);
});

module.exports = router;
