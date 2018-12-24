const router = require('express').Router();
const { getField, initField, addBlock } = require('../../../models/dev/shiratsuchi/fieidstore.js');

router.route('/').post(async (req, res) => {
  const x = +req.body.x;
  const y = +req.body.y;
  const directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  const field = await getField();
  const result = field.some((value) => value.x === x && value.y === y);
  let count = 0;

  directions.forEach((value) => {
    const x2 = x + value[0];
    const y2 = y + value[1];

    for (let i = 0; i < field.length; i += 1) {
      if (field[i].x === x2 && field[i].y === y2) {
        count += 1;
      }
    }
  });

  if (result === false && count > 0) {
    const block = { users: 'shiratsuchi', x: +req.body.x, y: +req.body.y };
    await addBlock(block);
  }
  res.json(await getField());
});

router.route('/').delete(async (req, res) => {
  await initField();
  res.json(await getField());
});

module.exports = router;
