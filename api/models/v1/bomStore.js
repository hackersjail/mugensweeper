const BomHistoryModel = require('./BomHistoryModel.js');
const createBomMap = require('../../routes/v1/bom/createBomMap.js');

const propFilter = '-_id -__v';
const bomMap = [];
const unsavedBom = [];

module.exports = {
  async initBom() {
    const boms = await BomHistoryModel.find({}, propFilter).lean();
    bomMap.push(...boms);
  },

  getBom() {
    return [...createBomMap(bomMap)];
  },

  addBom(add) {
    bomMap.push(add);
    unsavedBom.push(add);
  },

  async saveBom() {
    await BomHistoryModel.insertMany(unsavedBom);
    unsavedBom.length = 0;
  },
};
