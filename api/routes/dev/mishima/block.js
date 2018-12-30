const router = require('express').Router();
const { getField, initField, addBlock } = require('../../../models/dev/mishima/fieldStore.js');

router.route('/').delete(async (req, res) => {
  await initField();
  res.json(await getField());
});

router.route('/').post(async (req, res) => {
  const field = await getField();
  const fieldIdx = field.findIndex((elem) => elem.x === +req.body.x && elem.y === +req.body.y);
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

  if (fieldIdx === -1 && arroundCounter > 0) {
    const block = { x: +req.body.x, y: +req.body.y };
    await addBlock(block);
  }

  res.json(await getField());
});

module.exports = router;
