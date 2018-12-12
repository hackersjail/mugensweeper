const router = require('express').Router();

// 初期の盤面
const position = [{ x: 0, y: 0 }];

// prettier-ignore
const directions =[
  [-1,-1],
  [-1,0],
  [-1,1],
  [0,-1],
  [0,1],
  [1,-1],
  [1,0],
  [1,1]
];
// 周囲8マス確認用の配列とカウンター
let matchers = [];
let matchCount = 0;

// POST座標の重複カウンター
let dubliCount = 0;

// POSTした座標を追加する処理
router.route('/').post((req, res) => {
  // 送信された配列
  const x = Number(req.body.x);
  const y = Number(req.body.y);
  const arr = {
    x,
    y,
  };

  // 周囲8マス以外はrejectする
  if (matchers.length > 0) {
    // 最新POSTの周囲8マスと合致するかチェック
    for (let i = 0; i < matchers.length; i += 1) {
      if (JSON.stringify(matchers[i]) === JSON.stringify(arr)) {
        matchCount += 1;
      }
    }
    // 合致しない場合は処理を終了
    if (matchCount === 0) {
      res.json(position);
    }

    // 現配列とPOST座標の重複チェック
    if (position.length !== 0) {
      for (let i = 0; i < position.length; i += 1) {
        if (JSON.stringify(position[i]) === JSON.stringify(arr)) {
          dubliCount += 1;
        }
      }
      // 重複ありの場合は処理を終了
      if (dubliCount !== 0) {
        res.json(position);
      }
    }
  }
  // 周囲8マス&重複テストを通過した値を追加
  position.push(arr);

  // 周囲8マス配列を更新
  matchers = [];
  for (let i = 0; i < directions.length; i += 1) {
    const aroundX = arr.x + directions[i][0];
    const aroundY = arr.y + directions[i][1];
    matchers.push({
      x: aroundX,
      y: aroundY,
    });
  }

  // テストカウンターを初期化
  matchCount = 0;
  dubliCount = 0;

  res.send(position);
});

// 配列を初期化する処理
router.route('/').delete((req, res) => {
  position.length = 0;
  position.push({
    x: 0,
    y: 0,
  });

  // 周囲8マス配列を更新
  matchers = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];
  res.send(position);
});

module.exports = router;
