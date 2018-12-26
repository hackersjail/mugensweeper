const router = require('express').Router();
const { getField, initField } = require('../../../models/dev/rennie/fieldStore.js');

router.route('/').get(async (req, res) => {
  await initField();
  res.json(await getField());
});
module.exports = router;
