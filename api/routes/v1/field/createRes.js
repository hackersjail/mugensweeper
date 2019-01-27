// createRes.js

const { getBomb } = require('../../../models/v1/bombStore.js');
const countBombs = require('../bomb/countBombs.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req) => {
  const judgeExp = judgeExploded(req, getBomb());
  return {
    x: req.x,
    y: req.y,
    userId: req.userId,
    exploded: judgeExp,
    bombCount: judgeExp ? null : countBombs(getBomb(), req),
  };
};
