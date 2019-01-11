const BomHistoryModel = require('./BomHistoryModel.js');
const createBomMap = require('../../routes/v1/bom/createBomMap.js');

const propFilter = '-_id -__v';
const bomMap = [];
const unsavedBom = [];

module.exports = {
  async initBom() {
    const boms = await BomHistoryModel.find({}, propFilter).lean();
    bomMap.push(...createBomMap(boms));
  },

  getBom() {
    return [...bomMap];
  },

  addBom(add) {
    bomMap.push(...createBomMap([add]));
    unsavedBom.push(add);
  },

  async saveBom() {
    await BomHistoryModel.insertMany(unsavedBom);
    unsavedBom.length = 0;
  },
};
