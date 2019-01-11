const BomHistoryModel = require('./BomHistoryModel.js');
const createBomMap = require('../../routes/v1/bom/createBomMap.js');

const propFilter = '-_id -__v';
const bomMap = [];
const addedBom = [];

module.exports = {
  async initBoms() {
    const boms = await BomHistoryModel.find({}, propFilter).lean();
    bomMap.push(createBomMap(boms));
  },

  getBoms() {
    return [...bomMap];
  },

  addBoms(add) {
    addedBom.push(add);
  },

  async saveBoms() {
    await BomHistoryModel.insertMany(addedBom);
    addedBom.length = 0;
  },
};
