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
  const bomMap = bomStore.getData();
  // userの取得
  const user = userStore.getData();
  // new Field with bomMap の作成
  const fieldWithBoms = createNewfieldWithBomMap(field, bomMap);
  // rankingの作成
  const userPoint = calculatePointsForPlayer(fieldWithBoms, user);
  res.json(userPoint);
});
module.exports = router;
