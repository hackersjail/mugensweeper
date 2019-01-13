const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const userStore = require('../../../models/v1/userStore.js');
const { generateRanking } = require('../../../models/v1/pointStore.js');

router.post('/', async (req, res) => {
  // fieldの取得
  const field = fieldStore.getData();
  // console.log(field, 'y');
  // userの取得
  const user = userStore.getUser();
  // console.log(user, 'u');
  // rankingの作成
  const ranking = generateRanking(field);
  // console.log(ranking, 'ranking');
  const rankingWithUserNames = [];
  for (let i = 0; i < user.length; i += 1) {
    for (let m = 0; m < ranking.length; m += 1) {
      if (user[i].userId === ranking[m].userId) {
        const userPointsWithName = {
          points: ranking[m].points,
          userId: ranking[m].userId,
          userName: user[i].userName,
        };
        rankingWithUserNames.push(userPointsWithName);
      }
    }
    // console.log(rankingWithUserNames);
    res.json(rankingWithUserNames);
  }
});
module.exports = router;
