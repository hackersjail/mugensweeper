const router = require('express').Router();
const { getData, addData } = require('../../../models/v1/fieldStore.js');

router
  .route('/')
  .post((req, res) => {
    const result = addData(req.body);
    res.json(result);
  })
  .get((req, res) => {
    res.json(getData());
  });

module.exports = router;
