const { getBom, addBom } = require('../../../models/v1/bomStore.js');
const countBoms = require('../bom/countBoms.js');
const createPartOfBoms = require('../bom/createPartOfBoms.js');
const createBomMap = require('../bom/createBomMap.js');
const judgeField = require('../util/judgeField.js');
const judgeExploded = require('../util/judgeExploded.js');

module.exports = (req, field) => {
  const fieldInfo = {}; // 返却用
  // Storeに追加
  const { x, y, actionId } = req;
  const post = { x, y };
  fieldInfo.block = post;
  fieldInfo.status = false;

  // 置けたか判定
  const judgeF = judgeField(field, post);
  if (judgeF) {
    fieldInfo.status = true;
    // / ボム配置、周囲のボム数を計算
    createPartOfBoms(0.7, field, post);
    // BomHisに追加する処理
    const add = { x, y, actionId };
    addBom(add);
    // 最新ボムマップ取得
    const bomHis = getBom();
    const creBmap = createBomMap(bomHis);
    // 爆発したか判定
    const judgeExp = judgeExploded(post, creBmap);
    if (!judgeExp.exploded) {
      const bomCount = countBoms(creBmap, post);
      fieldInfo.block.bomCount = bomCount;
    } else {
      fieldInfo.block.exploded = true;
    }
  }

  return fieldInfo;
};
