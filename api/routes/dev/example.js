const router = require('express').Router();

router.route('/').get((req, res) => {
  res.send(req.query.string);
});

module.exports = router;
