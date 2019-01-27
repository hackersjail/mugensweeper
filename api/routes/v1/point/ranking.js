const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const userStore = require('../../../models/v1/userStore.js');
const generateRankingWithUserNames = require('../util/generateRankingWithUserNames.js');

const bestfive = [];

router.get('/', async (req, res) => {
  // const userId = req.user.userId;

  // const { userId } = jwt.decode(accessToken);
  // console.log(userId);
  // const user1 = req.currentUser;
  // fieldの取得
  const field = await fieldStore.getData();
  // userの取得
  const user = await userStore.getUser();
  // rankingの作成
  const ranking = generateRankingWithUserNames(field, user);

  await ranking.sort((a, b) => b.points - a.points);
  for (let i = 0; i < ranking.length; i += 1) {
    if (bestfive.length < 5) {
      bestfive.push(ranking[i]);
    } else if (bestfive.length <= 5) {
      if (ranking[5].points === ranking[i].points) {
        bestfive.push(ranking[i]);
      } else {
        break;
      }
    }
  }
  res.json(bestfive);
});
module.exports = router;
