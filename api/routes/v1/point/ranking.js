const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const userStore = require('../../../models/v1/userStore.js');
const generateRankingWithUserNames = require('../util/generateRankingWithUserNames.js');

const bestfive = [];

router.get('/', async (req, res) => {
  const currentUser = req.user.userId;
  // fieldの取得
  const field = await fieldStore.getData();
  // userの取得
  const users = await userStore.getUser();
  // rankingの作成
  const ranking = generateRankingWithUserNames(field, users);

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

  const myData1 = ranking.filter((i) => i.userId === currentUser);
  const myData = myData1[0];
  bestfive.unshift(myData);
  const data = bestfive.map(({ points, userName }) => ({ points, userName }));
  res.json(data);
});
module.exports = router;
