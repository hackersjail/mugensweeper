const router = require('express').Router();

const user = [];
router.route('/').post((req, res) => {
  if (req.body.userName) {
    const block = { userName: req.body.userName, userID: 222222 };
    user.push(block);
    res.json(user);
  }
  if (req.body.name) {
    if (req.body.name === 'tttt') {
      res.status(200).send('登録完了');
    } else {
      res.status(401).send('error');
    }
  }
});

module.exports = router;
