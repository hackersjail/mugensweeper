const router = require('express').Router();
// const FieldModel = require('../../../models/dev/rennie/fieldStore.js');
const { getField, initField, addBlock } = require('../../../models/dev/rennie/fieldStore.js');
// const field = await getField();

router.route('/').post(async (req, res) => {
  if (req.body.x) {
    // ここはmonngooseで追加したとこ（この３行）
    // const block = { x: +req.body.x, y: +req.body.y };
    await addBlock({ x: +req.body.x, y: +req.body.y });
    // await new FieldModel(block).save();
  }
  res.json(await getField());

  // console.log(await)
});

router.route('/').delete(async (req, res) => {
  await initField();
  // field.length = 1;
  res.json(await getField());
});

// // 同じ座標にはpostしても登録されない
// const field = [{ x: 0, y: 0 }];

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
// router.route('/').delete(async (req, res) => {
//   await initField();
//   // field.length = 1;
//   res.json(await getField());
// });

// ８方向に開く
router.route('/').post(async (req, res) => {
  if (req.body.x) {
    const x = +req.body.x;
    const y = +req.body.y;
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    const field = await getField();
    let match = true;
    let count = 0;
    // console.log('field', field);

    for (let m = 0; m < field.length; m += 1) {
      for (let i = 0; i < directions.length; i += 1) {
        const a = directions[i][0];
        const b = directions[i][1];
        if (field[m].x + a === x && field[m].y + b === y) {
          count += 1;
        }
      }
      if (field[m].x === x && field[m].y === y) {
        match = false;
      }
    }

    if (count !== 0 && match === true) {
      await addBlock({ x, y });
      // field.push({ x, y });
      // await new FieldModel(block).save();
    }
    res.json(await getField());
  }
});

router.route('/').delete(async (req, res) => {
  // field.length = 1;
  await initField();
  res.json(await getField());
});

module.exports = router;
