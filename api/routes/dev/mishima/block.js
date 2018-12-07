const router = require('express').Router();

const field = [{ x: 0, y: 0 }];

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

router.route('/').post((req, res) => {
  const fieldIdx = field.findIndex((elem) => elem.x === +req.body.x && elem.y === +req.body.y);
  // 周囲の相対的座標
  const directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

  const arroundCounter = directions.reduce((acc, val) => {
    const arroundX = +req.body.x + val[0];
    const arroundY = +req.body.y + val[1];
    let counter = 0;
    for (let i = 0; i < field.length; i += 1) {
      if (field[i].x === arroundX && field[i].y === arroundY) {
        counter += 1;
      }
    }
    return acc + counter;
  }, 0);

  // 重複していなければpushする
  if (fieldIdx === -1 && arroundCounter > 0) {
    field.push({ x: +req.body.x, y: +req.body.y });
  }

  res.json(field);
});

module.exports = router;
