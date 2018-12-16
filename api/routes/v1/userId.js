const router = require('express').Router();

router.route('/').post((req, res) => {
  let judge;
  if (req.body.name === 'tttt') {
    judge = 200;
  } else {
    judge = 401;
  }
  res.json(judge);
});

module.exports = router;
