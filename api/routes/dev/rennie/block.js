const router = require('express').Router();

// 同じ座標にはpostしても登録されない
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

// const field = [{ x: 0, y: 0 }];

// router.route('/').post((req, res) => {
//   if (req.body.x) {
//     const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
//     for (i = 0; i < directions.length; i++) {
//       const a = Number(directions[i][0]);
//       const b = Number(directions[i][1]);
//       let m = field.length;
//       while (m >= 0) {
//         if (field[m - 1].y + b === +req.body.y && field[m - 1].x + a === +req.body.x) {
//           field.push({ x: +req.body.x, y: +req.body.y });
//           m -= 1;
//           break;
//         }
//         m -= 1;
//         break;
//       }
//     }
//   }
//   console.log(field);
//   res.json(field);
// });

// router.route('/').delete((req, res) => {
//   field.length = 1;
//   res.json(field);
// });

module.exports = router;
