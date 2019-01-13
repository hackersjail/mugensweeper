const router = require('express').Router();

const position = [];

router.route('/').get((req, res) => {
  if (req.query !== '') {
    position.push({ x: 0, y: 0 });
  }
  res.send(position);
});

module.exports = router;
