const router = require('express').Router();
const { getData } = require('../../../models/dev/miyamoto/fieldStore.js');

// フロント開発用に準備
router.route('/').get(async (req, res) => {
  const field = await getData();
  res.json(field);
});

module.exports = router;
