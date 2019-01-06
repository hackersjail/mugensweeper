const router = require('express').Router();
const { addData } = require('../../../models/v1/userStore.js');

router.route('/').post((req, res) => {
  const { userName } = req.body;

  // 数値、アルファベット、_以外が出たらtrueを返す正規表現
  const halfLetter = /^[a-z0-9]([_a-z0-9]){2,13}[a-z0-9]$/;

  if (userName.length >= 3 && userName.length <= 7 && halfLetter.test(userName)) {
    res.status(200).send(addData(userName));
  } else {
    res.status(401).send('Error');
  }
});

module.exports = router;
