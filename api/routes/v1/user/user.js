const router = require('express').Router();

const user = [];
router.route('/').post((req, res) => {
  const { length } = req.body.userName;
  const { userName } = req.body;

  // ユニークな8桁のIDを生成
  const c = 'abcdefghijklmnopqrstuvwxyz0123456789'; // 生成する文字列に含める文字
  let r = '';
  for (let i = 0; i < 8; i += 1) {
    r += c[Math.floor(Math.random() * c.length)];
  }

  // 半角文字のみ許可
  const harfLetter = (value) => !value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/); // eslint-disable-line

  if (length > 2 && length < 8 && harfLetter(userName)) {
    user.push({ userName, userId: r });
    res.status(200).send(user);
  } else {
    res.status(401).send('Error');
  }
});

module.exports = router;
