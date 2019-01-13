const { getBom, addBom } = require('../../../models/v1/bomStore.js');
const countBoms = require('../bom/countBoms.js');
const createPartOfBoms = require('../bom/createPartOfBoms.js');
const judgeExploded = require('../util/judgeExploded.js');

const rate = 0.7;

module.exports = (req, field) => {
  const { x, y } = req;
  const fieldInfo = { x, y }; // 返却用

  // 周囲へボムを配置
  const add = createPartOfBoms(rate, field, req);
  addBom(add);
  // 周囲のボム数を計算
  fieldInfo.bomCount = countBoms(getBom(), req);
  // 爆発するか判定
  if (judgeExploded(req, getBom()).exploded) {
    fieldInfo.exploded = true;
  }
  return fieldInfo;
};
