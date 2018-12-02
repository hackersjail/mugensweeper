const router = require('express').Router();

let state = ''; // 試合中の盤面情報

// 盤面初期化用の関数
const reset = () => {
  // 初期盤面情報
  const initState = {
    client: [{ x: 0, y: 0 }],
  };

  // 盤面情報を初期化
  if (state === '') {
    state = Object.assign({}, initState);
  } else {
    // **********************
    // 現在の盤面情報の削除処理
    // **********************
    for (let c = 0; c < state.client.length; c += 1) {
      delete state.client[c].x;
      delete state.client[c].y;
    }
    state = Object.assign({}, initState);
  }
};

router
  .route('/')
  .post((req, res) => {
    const x = +req.body.x;
    const y = +req.body.y;
    let flag = false;
    if (state === '') reset();
    for (let i = 0; i < state.client.length; i += 1) {
      if (state.client[i].x !== x && state.client[i].y !== y) flag = true;
    }
    if (flag) state.client.push({ x, y });
    res.json(state.client);
  })
  .delete((req, res) => {
    reset();
    res.json(state.client);
  });
module.exports = router;
