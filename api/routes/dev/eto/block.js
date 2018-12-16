const router = require('express').Router();
const { getField, initField, addBlock } = require('../../../models/dev/eto/fieldStore.js');

// prettier-ignore
const directions =[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

// 周囲8マス確認用の配列
let matchers = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

// POSTした座標を追加する処理
router.route('/').post(async (req, res) => {
  // 送信された配列
  const block = {
    x: Number(req.body.x),
    y: Number(req.body.y),
  };

  // 周囲8マス以外はrejectする
  if (matchers.length > 0) {
    // 最新POSTの周囲8マスと合致するかチェック;
    for (let i = 0; i < matchers.length; i += 1) {
      if (matchers[i].x === block.x && matchers[i].y === block.y) {
        await addBlock(block);
      }
    }
  }

  // 周囲8マス配列を更新
  matchers = [];
  for (let i = 0; i < directions.length; i += 1) {
    const aroundX = block.x + directions[i][0];
    const aroundY = block.y + directions[i][1];
    matchers.push({
      x: aroundX,
      y: aroundY,
    });
  }
  res.send(await getField());
});

// 配列を初期化する処理
router.route('/').delete(async (req, res) => {
  // 周囲8マス配列を更新
  // prettier-ignore
  matchers = [{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: -1 },{ x: 0, y: 1 },{ x: 1, y: -1 },{ x: 1, y: 0 },
  { x: 1, y: 1 },];
  await initField();
  res.send(await getField());
});
module.exports = router;
