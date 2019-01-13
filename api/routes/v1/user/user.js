const router = require('express').Router();
const { addUser } = require('../../../models/v1/userStore.js');

router.route('/').post(async (req, res) => {
  const { userName } = req.body;

  // 数値、アルファベット、_以外が出たらtrueを返す正規表現
  const halfLetter = /^[a-z0-9]([_a-z0-9]){1,5}[a-z0-9]$/;
  /* eslint no-unused-expressions: 0 */
  halfLetter.test(userName)
    ? res.status(200).send(await addUser(userName))
    : res.status(401).send('Error');
});

module.exports = router;
