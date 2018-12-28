const router = require('express').Router();
const { addUser, getUser } = require('../../../../api/models/v1/userStore.js');

const user = [];

router.route('/').post(async (req, res) => {
  const { length } = req.body.userName;
  const { userName } = req.body;

  // ユニークな8桁のIDを生成
  const c = 'abcdefghijklmnopqrstuvwxyz0123456789'; // 生成する文字列に含める文字
  let userId = null;
  while (!userId) {
    let r = '';
    for (let i = 0; i < 8; i += 1) {
      r += c[Math.floor(Math.random() * c.length)];
    }

    if (user.length < 1) {
      userId = r;
    } else {
      const find = user.find((v) => v.userId === r);
      if (!find) {
        userId = r;
      }
    }
  }

  // 半角文字のみ許可
  const harfLetter = (value) => !value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/); // eslint-disable-line

  if (length >= 3 && length <= 7 && harfLetter(userName)) {
    user.push({ userName, userId });
    addUser({ userName, userId });

    res.status(200).send(await getUser());
  } else {
    res.status(401).send('Error');
  }
});

module.exports = router;
