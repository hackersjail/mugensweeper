const router = require('express').Router();
const { getData, addData } = require('../../../models/v1/fieldStore.js');

router
  .route('/')
  .post((req, res) => {
    const data = {
      x: +req.body.x,
      y: +req.body.y,
      userId: req.user.userId,
      isRequestToOpen: JSON.parse(req.body.isRequestToOpen),
    };
    res.json(addData(data));
  })
  .get((req, res) => {
    res.json(getData());
  });

module.exports = router;
