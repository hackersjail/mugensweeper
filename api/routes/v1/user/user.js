const router = require('express').Router();

const user = [];
router.route('/').post((req, res) => {
  const block = { userName: req.body.userName, userID: 222222 };
  user.push(block);
  res.json(user);
});
module.exports = router;
