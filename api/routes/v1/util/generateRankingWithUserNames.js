const { generateRanking } = require('../../../models/v1/pointStore.js');

module.exports = (fieldWithBombMap, user) => {
  const rankingWithUserNames = [];
  const ranking = generateRanking(fieldWithBombMap);
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
  }
  rankingWithUserNames.sort((a, b) => b.points - a.points || a.userName > b.userName);
  return rankingWithUserNames;
};
