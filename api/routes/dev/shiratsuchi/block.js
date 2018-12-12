const router = require('express').Router();

let arr = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  const x = +req.body.x;
  const y = +req.body.y;
  const directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  const result = arr.some((value) => value.x === x && value.y === y);
  let count = 0;

  directions.forEach((value) => {
    const x2 = x + value[0];
    const y2 = y + value[1];

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].x === x2 && arr[i].y === y2) {
        count += 1;
      }
    }
    return count;
  });

  if (result === false && count > 0) {
    arr.push({ x, y });
  }

  res.json(arr);
});

router.route('/').delete((req, res) => {
  arr = [{ x: 0, y: 0 }];
  res.json(arr);
});

module.exports = router;
