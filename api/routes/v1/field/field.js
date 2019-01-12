const router = require('express').Router();
const { getData, post2Field } = require('../../../models/v1/fieldStore.js');
// const post2res = require('./post2res.js');

router
  .route('/')
  .post((req, res) => {
    const result = post2Field(req.body);
    res.json(result);
  })
  .get((req, res) => {
    res.json(getData());
  });

module.exports = router;
