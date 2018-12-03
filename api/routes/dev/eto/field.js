const router = require('express').Router();
const body = [];

router.route('/').get((req, res) => {
  if (Object.keys(req.body).length === 0) {
    body.push({ x: 0, y: 0 });
  }
  res.send(body);
});

module.exports = router;
