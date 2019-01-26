const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const userStore = require('../../../models/v1/userStore.js');
const bombStore = require('../../../models/v1/bombStore.js');
const generateRankingWithUserNames = require('../util/generateRankingWithUserNames.js');
const judgeExploded = require('../util/judgeExploded.js');

router.post('/', async (req, res) => {
  // console.log(req.body);
  // fieldの取得
  // const field = req.field;
  const field = await fieldStore.getData();
  // bombの取得
  const bomb = await bombStore.getBomb();
  // console.log(field, 'y');
  // userの取得
  // const user = req.user;
  const user = await userStore.getUser();
  // console.log(user, 'u');
  const fieldWithBomb = [];
  for (let i = 0; i < field.length; i += 1) {
    fieldWithBomb.push(judgeExploded(field[i], bomb));
  }
  // console.log(fieldWithBomb, 'fwithBO');
  // rankingの作成
  const ranking = generateRankingWithUserNames(fieldWithBomb, user);
  // console.log(ranking, 'ranran');
  res.json(ranking);
});
module.exports = router;
