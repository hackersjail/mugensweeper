const router = require('express').Router();
const { initField, getField } = require('../../../models/dev/ryoko/fieldStore.js');

router.route('/').get(async (req, res) => {
  await initField();
  res.json(await getField());
});

module.exports = router;
