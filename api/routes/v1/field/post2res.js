const { getBom, addBom } = require('../../../models/v1/bomStore.js');
const countBoms = require('../bom/countBoms.js');
const createPartOfBoms = require('../bom/createPartOfBoms.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req, field) => {
  const { x, y, actionId, userId } = req;
  const fieldInfo = { x, y, userId }; // 返却用

  // 周囲へボムを配置
  const result = createPartOfBoms(0.7, field, req);
  for (let n = 0; n < result.length; n += 1) {
    addBom({ x: result[n].x, y: result[n].y, actionId });
  }
  // 周囲のボム数を計算
  fieldInfo.bomCount = countBoms(getBom(), req);
  // 爆発するか判定
  if (judgeExploded(req, getBom()).exploded) {
    fieldInfo.exploded = true;
  }
  return fieldInfo;
};
