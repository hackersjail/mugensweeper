const router = require('express').Router();
// const FieldModel = require('../../../models/dev/rennie/fieldStore.js');
const { getField, initField, addBlock } = require('../../../models/dev/rennie/fieldStore.js');
// const field = await getField();

// router.route('/').post(async (req, res) => {
//   if (req.body.x) {
//     // ここはmonngooseで追加したとこ（この３行）
//     // const block = { x: +req.body.x, y: +req.body.y };
//     await addBlock({ x: +req.body.x, y: +req.body.y });
//     // await new FieldModel(block).save();
//   }
//   res.json(await getField());

//   // console.log(await)
// });

// router.route('/').delete(async (req, res) => {
//   await initField();
//   // field.length = 1;
//   res.json(await getField());
// });

// // 同じ座標にはpostしても登録されない
// // const field = [{ x: 0, y: 0 }];

// router.route('/').delete(async (req, res) => {
//   await initField();
//   // field.length = 1;
//   res.json(await getField());
// });//

// router.route('/').delete(async (req, res) => {
//   await initField();
//   // field.length = 1;
//   res.json(await getField());
// });//

// router.route('/').post(async(req, res) => {
//   if (req.body.x) {
//     const field = await getField();
//     const a = +req.body.x;
//     const b = +req.body.y;
//     const dup = field.findIndex((e) => a === e.x && b === e.y);

//     if (dup === -1) {
//       await addBlock({ x :a , y: b });
//     }

//     res.json(await getField());
//   }
// });

//  router.route('/').delete(async (req, res) => {
//   await initField();
//   // field.length = 1;
//   res.json(await getField());
// });//

// ８方向に開く
router.route('/').post(async (req, res) => {
  if (req.body.x) {
    const x = +req.body.x;
    const y = +req.body.y;
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    const field = await getField();
    let match = true;
    let count = 0;

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
