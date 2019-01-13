const router = require('express').Router();
const { getData, addData } = require('../../../models/v1/fieldStore.js');

router
  .route('/')
  .post((req, res) => {
    res.json(addData(req.body));
  })
  .get((req, res) => {
    res.json(getData());
  });

module.exports = router;
