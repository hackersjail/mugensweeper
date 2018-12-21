const router = require('express').Router();

const user = [];
router.route('/').post((req, res) => {
  if (req.body.userName === 'yui' || req.body.userName === 'taro') {
    const block = { userName: req.body.userName, userId: 222222 };
    user.push(block);
    res.json(user);
  } else if (req.body.userName === 'tttt') {
    res.status(200).send('登録完了');
  } else {
    res.status(401).send('error');
  }
});

module.exports = router;
