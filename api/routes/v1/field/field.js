const router = require('express').Router();
const { getData, addData } = require('../../../models/v1/fieldStore.js');

router
  .route('/')
  .post(async (req, res) => {
    await addData({ x: +req.body.x, y: +req.body.y });
    res.json(await getData());
  })
  .get(async (req, res) => {
    res.json(await getData());
  });

module.exports = router;
