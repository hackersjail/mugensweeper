const router = require('express').Router();

const initialPosition = [];

router.route('/').get((req, res) => {
  if (req.query !== '') {
    initialPosition.push({ x: 0, y: 0 });
  }
  res.send(initialPosition);
});

module.exports = router;
