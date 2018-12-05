const router = require('express').Router();

// field testのぶん

// router.route('/').post((req, res) => {
//   res.json([
//     {
//       x: 0,
//       y: 0,
//     },
//     {
//       x: +req.body.x,
//       y: +req.body.y,
//     },
//   ]);
// });

// block テスト１と２番目
// const field = [{ x: 0, y: 0 }];

// router.route('/').post((req, res) => {
//   if (req.body.x) {
//     field.push({ x: +req.body.x, y: +req.body.y });
//   }
//   res.json(field);
//   console.log(field);
// });
// ２番目はここを消す
// router.route('/').delete((req, res) => {
//   field.length = 1;
//   res.json(field);
// });

// 同じ座標にはpostしても登録されない

// router.route('/').delete((req, res) => {
//   field.length = 1;
//   res.json(field);
// });
const field = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  if (req.body.x) {
    let m = field.length;
    while (m >= 0) {
      if (field[m - 1].x !== +req.body.x) {
        if (m - 1 === 0) {
          field.push({ x: +req.body.x, y: +req.body.y });
          m -= 1;
          break;
        }
        m -= 1;
      }
      if (field[m - 1].y !== +req.body.y && field[m - 1].x === +req.body.x) {
        m -= 1;
        if (m - 1 === 0) {
          field.push({ x: +req.body.x, y: +req.body.y });
          m -= 1;
          break;
        }
      }
      if (field[m - 1].x === +req.body.x && field[m - 1].y === +req.body.y) {
        break;
      }
      field.push({ x: +req.body.x, y: +req.body.y });
      break;
    }
  }
  res.json(field);
});

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

module.exports = router;
