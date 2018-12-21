const router = require('express').Router();

let array = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  const x = +req.body.x;
  const y = +req.body.y;
  const directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  const result = array.some((value) => value.x === x && value.y === y);
  let count = 0;

  directions.forEach((value) => {
    const x2 = x + value[0];
    const y2 = y + value[1];

    for (let i = 0; i < array.length; i += 1) {
      if (array[i].x === x2 && array[i].y === y2) {
        count += 1;
      }
    }
  });

  if (result === false && count > 0) {
    array.push({ x, y });
  }

  res.json(array);
});

router.route('/').delete((req, res) => {
  array = [{ x: 0, y: 0 }];
  res.json(array);
});

module.exports = router;
