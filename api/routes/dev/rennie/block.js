const router = require('express').Router();
const { getField, initField, addBlock } = require('../../../models/dev/rennie/fieldStore.js');

// ８方向に開く
router.route('/').post(async (req, res) => {
  if (req.body.x) {
    const x = +req.body.x;
    const y = +req.body.y;
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    const field = await getField();
    let match = true;
    let count = 0;

    for (let m = 0; m < field.length; m += 1) {
      for (let i = 0; i < directions.length; i += 1) {
        const a = directions[i][0];
        const b = directions[i][1];
        if (field[m].x + a === x && field[m].y + b === y) {
          count += 1;
        }
      }
      if (field[m].x === x && field[m].y === y) {
        match = false;
      }
    }

    if (count !== 0 && match === true) {
      await addBlock({ x, y });
    }
    res.json(await getField());
  }
});

router.route('/').delete(async (req, res) => {
  await initField();
  res.json(await getField());
});

module.exports = router;
