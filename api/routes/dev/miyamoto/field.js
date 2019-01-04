const router = require('express').Router();
const { initField, getField, getData } = require('../../../models/dev/miyamoto/fieldStore.js');

router.route('/').get(async (req, res) => {
  await initField();
  res.send(await getField());
});

// フロント開発用に準備
router.route('/temp').get(async (req, res) => {
  const field = await getData();
  res.json(field);
});

module.exports = router;
