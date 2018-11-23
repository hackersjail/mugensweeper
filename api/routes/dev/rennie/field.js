const router = require('express').Router();

const field = [{ x: 0, y: 0 }];
// const test = [
//   { x: 0, y: 0, name: 'matsu' },
//   {
//     x: 1,
//     y: 2,
//     user: {
//       name: 'mishima',
//       sex: 2,
//       address: 'tokyo',
//     },
//   },
// ];
// console.log(test[1].user.name);
router.route('/').get((req, res) => {
  res.send(field);
});

module.exports = router;
