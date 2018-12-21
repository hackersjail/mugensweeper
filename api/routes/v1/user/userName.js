const router = require('express').Router();

router.route('/').post((req, res) => {
  if (req.body.name === 'tttt') {
    res.status(200).send('登録完了');
  } else {
    res.status(401).send('error');
  }
});

module.exports = router;
