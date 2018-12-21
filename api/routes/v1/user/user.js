const router = require('express').Router();

const user = [];
router.route('/').post((req, res) => {
  if (req.body.name === 'yui' || req.body.name === 'taro') {
    const block = { name: req.body.name, userID: 222222 };
    user.push(block);
    res.json(user);
  } else if (req.body.name === 'tttt') {
    res.status(200).send('登録完了');
  } else {
    res.status(401).send('error');
  }
});

module.exports = router;
