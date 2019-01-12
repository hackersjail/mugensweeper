const { getBom, addBom } = require('../../../models/v1/bomStore.js');
const countBoms = require('../bom/countBoms.js');
const createPartOfBoms = require('../bom/createPartOfBoms.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req, field) => {
  const { x, y, actionId } = req;
  const fieldInfo = { x, y }; // 返却用
  const post = { x, y };

  // 周囲へボムを配置
  const result = createPartOfBoms(0.7, field, post);
  for (let n = 0; n < result.length; n += 1) {
    addBom({ x: result[n].x, y: result[n].y, actionId });
  }

  // 爆発するか判定
  if (!judgeExploded(post, getBom()).exploded) {
    // 周囲のボム数を計算
    fieldInfo.bomCount = countBoms(getBom(), post);
  } else {
    fieldInfo.bomCount = countBoms(getBom(), post);
    fieldInfo.exploded = true;
  }
  return fieldInfo;
};
