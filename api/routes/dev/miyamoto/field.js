const router = require('express').Router();

// let state = ''; // 試合中の盤面情報

// // 盤面初期化用の関数
// const reset = () => {
//   // 初期ステータス一覧
//   // prettier-ignore
//   const initState = {
//     map: [
//       [{ x: -1, y: -1, opened: false, hasBom: false, numBom: '', hasFlag: false }, { x: 0, y: -1, opened: false, hasBom: false, numBom: '', hasFlag: false }, { x: 1, y: -1, opened: false, hasBom: false, numBom: '', hasFlag: false }],
//       [{ x: -1, y: 0, opened: false, hasBom: false, numBom: '', hasFlag: false }, { x: 0, y: 0, opened: true, hasBom: false, numBom: '', hasFlag: false }, { x: 1, y: 0, opened: false, hasBom: false, numBom: '', hasFlag: false }],
//       [{ x: -1, y: 1, opened: false, hasBom: false, numBom: '', hasFlag: false }, { x: 0, y: 1, opened: false, hasBom: false, numBom: '', hasFlag: false }, { x: 1, y: 1, opened: false, hasBom: false, numBom: '', hasFlag: false }],
//     ],
//     client: [
//       [{ x: -1, y: -1, opened: false },{ x: 0, y: -1, opened: false },{ x: 1, y: -1, opened: false }],
//       [{ x: -1, y: 0, opened: false },{ x: 0, y: 0, opened: true },{ x: 1, y: 0, opened: false }],
//       [{ x: -1, y: 1, opened: false },{ x: 0, y: 1, opened: false },{ x: 1, y: 1, opened: false }],
//     ]
//   };

//   // 盤面情報を初期化
//   if (state === '') {
//     state = Object.assign({}, initState);
//   } else {
//     // **********************
//     // 現在の盤面情報の削除処理
//     // **********************
//     // 縦マスオブジェクト処理
//     for (let r = 0; r < state.map.length; r += 1) {
//       // 横マスオブジェクト処理
//       for (let c = 0; c < state.map.length; c += 1) {
//         delete state.map[r][c].opened;
//         delete state.map[r][c].hasBom;
//         delete state.map[r][c].numBom;
//         delete state.map[r][c].hasFlag;
//         delete state.client[r][c].opened;
//         if (state.client[r][c].numBom !== undefined) {
//           delete state.client[r][c].numBom;
//           delete state.client[r][c].hasFlag;
//         }
//       }
//     }
//     state = Object.assign({}, initState);
//   }

//   return state;
// };

// router.route('/').get((req, res) => {
//   const data = req.query;
//   const x = Number(data.x);
//   const y = Number(data.y);
//   const cnt = state.map.length;
//   let result;

//   [...Array(cnt)].reduce(
//     (acc, c, idx) =>
//       [...Array(cnt)].reduce(
//         // eslint-disable-next-line no-return-assign
//         (acc2, c2, idx2) =>
//           state.map[idx][idx2].x === x && state.map[idx][idx2].y === y
//             ? (result = state.client[idx][idx2])
//             : '',
//         '',
//       ),
//     '',
//   );
//   res.json([result]);
// });

// router.route('/reset').get((req, res) => {
//   reset();
//   res.send(state.client);
// });

router.route('/').get((req, res) => {
  res.send([{ x: 0, y: 0 }]);
});

module.exports = router;
