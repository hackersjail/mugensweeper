const router = require('express').Router();
const fieldStore = require('../../../models/v1/fieldStore.js');
const bomStore = require('../../../models/v1/bomStore.js');
const { createNewfieldWithBomMap, generateRanking } = require('../../../models/v1/pointStore.js');

router.get('/', async (req, res) => {
  // fieldの取得
  const field = fieldStore.getData();
  // bomMapの取得
  const bomMap = bomStore.getData();
  // new Field with bomMap の作成
  const fieldWithBoms = createNewfieldWithBomMap(field, bomMap);
  // rankingの作成
  const ranking = generateRanking(fieldWithBoms);
  res.json(ranking);
});
module.exports = router;
