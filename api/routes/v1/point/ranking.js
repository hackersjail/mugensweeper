const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const userStore = require('../../../models/v1/userStore.js');
const generateRankingWithUserNames = require('../util/generateRankingWithUserNames.js');

router.get('/', async (req, res) => {
  const bestfive = [];
  const currentUserId = req.user.userId;
  const currentUserName = req.user.userName;
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
    } else if (bestfive.length >= 5) {
      if (ranking[5].points === ranking[i].points) {
        bestfive.push(ranking[i]);
      } else {
        break;
      }
    }
  }

  const preMyData = ranking.find((v) => v.userId === currentUserId);
  const calculateRanking = (points) => ranking.findIndex((v) => v.points === points) + 1;
  const worstPoint = ranking[ranking.length - 1].points;
  const worstRanking = calculateRanking(worstPoint);
  const preMyRanking = preMyData !== undefined ? calculateRanking(preMyData.points) : worstRanking;
  const myData =
    preMyData === undefined
      ? { points: 0, userName: currentUserName, myRanking: worstRanking }
      : { points: preMyData.points, userName: currentUserName, myRanking: preMyRanking };
  const highScores = bestfive.map(({ points, userName }) => ({ points, userName }));
  res.json({ highScores, myData });
});
module.exports = router;
