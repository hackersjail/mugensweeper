const router = require('express').Router();

const user = [];
router.route('/').post((req, res) => {
  const { length } = req.body.userName;
  const { userName } = req.body;

  const harfLetter = (value) => !value.match(/[^\x01-\x7E]/) || !value.match(/[^\uFF65-\uFF9F]/); // eslint-disable-line

  if (length > 2 && length < 8 && harfLetter(userName)) {
    user.push({ userName, userId: 222222 });
    res.json(user);
    res.status(200).send('success');
  } else {
    res.status(401).send('error');
  }
});

module.exports = router;
