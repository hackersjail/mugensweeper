const router = require('express').Router();

console.log('field.js');
router.route('/').get((req, res) => {
  // res.send([{x:0,y:0}]);
  res.send([
    { x: 0, y: 0, name: 'matsuda' },
    {
      x: 2,
      y: 0,
      user: {
        neme: 'mishima',
        sex: 2,
        address: 'tokyo',
      },
    },
  ]);
});

module.exports = router;
