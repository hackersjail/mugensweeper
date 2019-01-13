const { getBom, addBom } = require('../../../models/v1/bomStore.js');
const countBoms = require('../bom/countBoms.js');
const createPartOfBoms = require('../bom/createPartOfBoms.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req, field) => {
  const { x, y, actionId } = req;
  const fieldInfo = { x, y }; // 返却用
  const rate = 0.7;

  // 周囲へボムを配置
  createPartOfBoms(rate, field, req).forEach((n) => addBom({ x: n.x, y: n.y, actionId }));

  // 周囲のボム数を計算
  fieldInfo.bomCount = countBoms(getBom(), req);

  // 爆発するか判定
  if (judgeExploded(req, getBom()).exploded) {
    fieldInfo.exploded = true;
  } else {
    fieldInfo.exploded = false;
  }
  return fieldInfo;
};
