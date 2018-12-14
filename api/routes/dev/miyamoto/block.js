const router = require('express').Router();

let state = {}; // 試合中の盤面情報

// 周囲８ブロックチェック用情報
const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

// 盤面初期化用の関数
const reset = () => {
  // 初期盤面情報
  const initState = {
    client: [{ x: 0, y: 0 }],
  };
  // 盤面情報を初期化
  state = Object.assign({}, initState);
};

reset();

router
  .route('/')
  .post((req, res) => {
    const x = +req.body.x;
    const y = +req.body.y;
    let flag = true;
    let cnt = 0;

    for (let i = 0; i < state.client.length; i += 1) {
      for (let h = 0; h < directions.length; h += 1) {
        const tmpX = state.client[i].x - directions[h][0];
        const tmpY = state.client[i].y - directions[h][1];
        if (tmpX === x && tmpY === y) cnt += 1;
      }
      if (state.client[i].x === x && state.client[i].y === y) flag = false;
    }
    if (cnt === 0) flag = false;
    if (flag) state.client.push({ x, y });
    res.json(state.client);
  })
  .delete((req, res) => {
    reset();
    res.json(state.client);
  });
module.exports = router;
