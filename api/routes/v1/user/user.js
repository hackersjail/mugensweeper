const router = require('express').Router();
const { getData, addData } = require('../../../models/v1/userStore.js');

router
  .route('/')
  .post((req, res) => {
    const { userName } = req.body;

    // 半角文字のみ許可
    const harfLetter = (value) => !value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/); // eslint-disable-line

    if (userName.length >= 3 && userName.length <= 7 && harfLetter(userName)) {
      res.status(200).send(addData(userName));
    } else {
      res.status(401).send('Error');
    }
  })
  .get((req, res) => {
    res.json(getData());
  });

module.exports = router;
