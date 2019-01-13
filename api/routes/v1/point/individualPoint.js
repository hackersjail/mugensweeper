const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const bomStore = require('../../../models/v1/bomStore.js');
const userStore = require('../../../models/v1/userStore.js');
const {
  createNewfieldWithBomMap,
  calculatePointsForPlayer,
} = require('../../../models/v1/pointStore.js');

router.post('/', async (req, res) => {
  // fieldの取得
  const field = fieldStore.getData();
  // bomMapの取得
  const bomMap = bomStore.getBom();
  // userの取得
  const user = userStore.getUser();
  // new Field with bomMap の作成
  const fieldWithBoms = createNewfieldWithBomMap(field, bomMap);
  // rankingの作成
  const userPoint = calculatePointsForPlayer(fieldWithBoms, user.userId);
  const userPointsWithUserNames = [];
  for (let i = 0; i < user.length; i += 1) {
    for (let m = 0; m < userPoint.length; m += 1) {
      if (user[i].userId === userPoint[m].userId) {
        const userPointsWithName = {
          points: userPoint[m].points,
          userId: userPoint[m].userId,
          userName: user[i].userName,
        };
        userPointsWithUserNames.push(userPointsWithName);
      }
    }

    res.json(userPointsWithUserNames);
  }
});
module.exports = router;
