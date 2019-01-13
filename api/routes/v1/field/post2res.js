const { getBom, addBom } = require('../../../models/v1/bomStore.js');
const countBoms = require('../bom/countBoms.js');
const createPartOfBoms = require('../bom/createPartOfBoms.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req, field) => {
  const { x, y, actionId } = req;
  const fieldInfo = { x, y }; // 返却用
  const rate = +0.7;

  // 周囲へボムを配置
  const result = createPartOfBoms(rate, field, req);

  const add = result.map((n) => ({ x: n.x, y: n.y, actionId }));
  addBom(add);

  // 周囲のボム数を計算
  fieldInfo.bomCount = countBoms(getBom(), req);
  // 爆発するか判定
  if (judgeExploded(req, getBom()).exploded) {
    fieldInfo.exploded = true;
  }
  return fieldInfo;
};
