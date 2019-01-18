const { getBomb, addBomb } = require('../../../models/v1/bombStore.js');
const countBombs = require('../bomb/countBombs.js');
const createPartOfBombs = require('../bomb/createPartOfBombs.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req, field) => {
  const rate = 0.7;

  // 周囲へボムを配置
  createPartOfBombs(rate, field, req).forEach((n) =>
    addBomb({ x: n.x, y: n.y, actionId: n.actionId }),
  );
  // 爆弾関連の情報を返却
  return {
    x: req.x,
    y: req.y,
    bombCount: countBombs(getBomb(), req),
    exploded: judgeExploded(req, getBomb()).exploded,
    userId: req.userId,
  };
};
