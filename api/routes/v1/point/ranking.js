const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const userStore = require('../../../models/v1/userStore.js');
const generateRankingWithUserNames = require('../util/generateRankingWithUserNames.js');

router.post('/', async (req, res) => {
  // fieldの取得
  const field = await fieldStore.getData();
  // userの取得
  const user = await userStore.getUser();
  // rankingの作成
  const ranking = generateRankingWithUserNames(field, user);
  res.json(ranking);
});
module.exports = router;
