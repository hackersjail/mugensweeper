const { addBomb } = require('../../../models/v1/bombStore.js');
const createPartOfBombs = require('../bomb/createPartOfBombs.js');
const createRes = require('./createRes');

module.exports = (req, field, actionId) => {
  const rate = 0.3;

  // 周囲へボムを配置
  createPartOfBombs(rate, field, req).forEach((n) => addBomb({ x: n.x, y: n.y, actionId }));

  // 爆弾関連の情報を返却
  return createRes(req);
};
