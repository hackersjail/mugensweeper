const router = require('express').Router();
const directions = require('../../../util/directions.js')(); // 周囲８ブロックチェック用情報
const { initField, getField, addBlock } = require('../../../models/dev/miyamoto/fieldStore.js');

router
  .route('/')
  .post(async (req, res) => {
    const x = +req.body.x;
    const y = +req.body.y;
    let flag = true;
    let cnt = 0;
    const state = await getField();

    for (let i = 0; i < state.length; i += 1) {
      for (let h = 0; h < directions.length; h += 1) {
        const tmpX = state[i].x - directions[h][0];
        const tmpY = state[i].y - directions[h][1];
        if (tmpX === x && tmpY === y) cnt += 1;
      }
      if (state[i].x === x && state[i].y === y) flag = false;
    }
    if (cnt === 0) flag = false;
    if (flag) await addBlock({ x, y });

    res.json(await getField());
  })
  .delete(async (req, res) => {
    await initField();
    res.json(await getField());
  });
module.exports = router;
