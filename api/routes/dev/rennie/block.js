const router = require('express').Router();

// 同じ座標にはpostしても登録されない;
const field = [{ x: 0, y: 0 }];

// router.route('/').post((req, res) => {
//   if (req.body.x) {
//     let m = field.length;
//     while (m >= 0) {
//       if (field[m - 1].x !== +req.body.x) {
//         if (m - 1 === 0) {
//           field.push({ x: +req.body.x, y: +req.body.y });
//           m -= 1;
//           break;
//         }
//         m -= 1;
//       }
//       if (field[m - 1].y !== +req.body.y && field[m - 1].x === +req.body.x) {
//         m -= 1;
//         if (m - 1 === 0) {
//           field.push({ x: +req.body.x, y: +req.body.y });
//           m -= 1;
//           break;
//         }
//       }
//       if (field[m - 1].x === +req.body.x && field[m - 1].y === +req.body.y) {
//         break;
//       }
//       field.push({ x: +req.body.x, y: +req.body.y });
//       break;
//     }
//   }
//   res.json(field);
// });

// router.route('/').delete((req, res) => {
//   field.length = 1;
//   res.json(field);
// });

// const field = [{ x: 0, y: 0 }];

router.route('/').post((req, res) => {
  if (req.body.x) {
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    for (let i = 0; i < directions.length; i + 1) {
      const a = Number(directions[i][0]);
      const b = Number(directions[i][1]);
      let m = field.length;
      while (m >= 0) {
        if (field[m - 1].y + b === +req.body.y && field[m - 1].x + a === +req.body.x) {
          field.push({ x: +req.body.x, y: +req.body.y });
          m -= 1;
          break;
        }
        m -= 1;
        break;
      }
    }
  }
  // console.log(field);
  res.json(field);
});

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

// const field = [{ x: 0, y: 0 }];
// const openedBlock = [];
// const boms = [];
// const tempBlock = [];

// router.route('/').post((req, res) => {
//   // const openedBlock = [];
//   // const boms = [];
//   // const tempBlock = [];
//   if (req.body.x) {
//     const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
//     for (let i = 0; i < directions.length; i++) {
//       const a = Number(directions[i][0]);
//       const b = Number(directions[i][1]);
//       let m = field.length;
//       while (m >= 0) {
//         if (field[m - 1].y + b === +req.body.y && field[m - 1].x + a === +req.body.x) {
//           field.push({ x: +req.body.x, y: +req.body.y });
//           if (tempBlock.length === 0) {
//             for (let i = 0; i < directions.length; i++) {
//               const c = Number(directions[i][0]);
//               const d = Number(directions[i][1]);
//               const e = field[m - 1].x + c;
//               const f = field[m - 1].y + d;
//               tempBlock.push({ x: e, y: f });
//             }
//           } else {
//             for (let i = 0; i < directions.length; i++) {
//               const c = Number(directions[i][0]);
//               const d = Number(directions[i][1]);
//               const e = field[m - 1].x + c;
//               const f = field[m - 1].y + d;
//               console.log(tempBlock, 'kokoi');
//               tempBlock.filter((a, b, c) => {
//                 if (c[b].x === e && c[b].y === f) {
//                 } else {
//                   console.log('BBBBBBBBBBBB');
//                   tempBlock.push({ x: e, y: f });
//                 }
//               });
//             }
//           }
//           m -= 1;
//           break;
//         }
//         m -= 1;
//         break;
//       }
//     }
//     console.log(tempBlock);
//     const bomCount = tempBlock.length * 0.375;
//     for (let i = 0; i < bomCount; i++) {
//       const number = Math.floor(tempBlock.length * Math.random());
//       const tempx = tempBlock[number].x;
//       const tempy = tempBlock[number].y;
//       boms.push({ x: tempx, y: tempy });
//     }
//     console.log('boms3', boms);
//     res.json(boms);

//     if (openedBlock.length === 0) {
//       for (let i = 0; i < tempBlock.length; i++) {
//         openedBlock.push({ x: tempBlock[i][0], y: tempBlogk[i][1] });
//       }
//     } else {
//       openedBlock.concat(tempBlock);
//     }
//     console.log('kore', tempBlock);
//     console.log('kotti', openedBlock);
//     console.log('GGGGGG');

//     tempBlock.empty();
//   }
//   console.log('boms2', boms);
//   // res.json(boms);
// });

// router.route('/').delete((req, res) => {
//   field.length = 1;
//   res.json(field);
// });

module.exports = router;
