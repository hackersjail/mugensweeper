const router = require('express').Router();
const { getField, initField, addBlock } = require('../../../models/dev/eto/fieldStore.js');

// prettier-ignore
const directions =[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

let around = [];
let dubliCheck = false;

// POSTした座標を追加する処理
router.route('/').post(async (req, res) => {
  // 送信された配列
  const block = {
    x: +req.body.x,
    y: +req.body.y,
  };
  const positions = await getField();

  // 重複チェック
  for (let i = 0; i < positions.length; i += 1) {
    if (block.x === positions[i].x && block.y === positions[i].y) {
      dubliCheck = true;
    }
  }
  if (dubliCheck === false) {
    // 配列の周囲8マス(around)を生成
    for (let i = 0; i < positions.length; i += 1) {
      for (let k = 0; k < directions.length; k += 1) {
        const aroundX = positions[i].x + directions[k][0];
        const aroundY = positions[i].y + directions[k][1];
        around.push({ x: aroundX, y: aroundY });
      }
    }
    // aroundの重複を削除
    const around2 = around.filter(
      (v1, i1, a1) => a1.findIndex((v2) => v1.x === v2.x && v1.y === v2.y) === i1,
    );

    // blockが配列の周囲8マス(around2)に含まれるかチェック
    for (let i = 0; i < around2.length; i += 1) {
      if (block.x === around2[i].x && block.y === around2[i].y) {
        await addBlock(block);
      }
    }
  }
  dubliCheck = false;
  around = [];
  res.send(await getField());
});

// 配列を初期化する処理
router.route('/').delete(async (req, res) => {
  await initField();
  res.send(await getField());
});
module.exports = router;
