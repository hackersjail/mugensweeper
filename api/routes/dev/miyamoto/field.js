const router = require('express').Router();
const { initField, getField } = require('../../../models/dev/miyamoto/fieldStore.js');

router.route('/').get(async (req, res) => {
  await initField();
  res.send(await getField());
});

module.exports = router;
