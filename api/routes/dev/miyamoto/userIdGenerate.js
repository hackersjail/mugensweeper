const router = require('express').Router();
const jwt = require('jsonwebtoken');
const generateAccessToken = require('../../v1/authentication/generateAccessToken.js');
const { addUser } = require('../../../models/dev/miyamoto/userStore.js');

router.route('/').post((req, res) => {
  const ans = {};
  const accessToken = generateAccessToken();
  const { userId } = jwt.decode(accessToken);
  const { userName } = req.body;

  // 禁止文字の検索、最短の検索、最長の検索
  if (userName !== null && userName !== undefined) {
    ans.userName = userName;
    ans.userId = userId;
    ans.token = `JWT ${accessToken}`;
    addUser(ans);
  } else {
    ans.userName = null;
    ans.userId = null;
    ans.token = null;
  }
  res.json(ans);
});

module.exports = router;
