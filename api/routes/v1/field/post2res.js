const { getBomb } = require('../../../models/v1/bombStore.js');
const countBombs = require('../bomb/countBombs.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req) =>
  // 爆弾関連の情報を返却
  ({
    x: +req.x,
    y: +req.y,
    bombCount: countBombs(getBomb(), req),
    exploded: judgeExploded(req, getBomb()).exploded,
    userId: req.userId,
  });
