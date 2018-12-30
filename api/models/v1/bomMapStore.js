const BomHistoryModel = require('./BomHistoryModel.js');
const createBomMap = require('../../routes/v1/util/createBomMap.js');

const propFilter = '-_id -__v';
const bomMap = [];
const addedBom = [];
module.exports = {
  async initData() {
    const boms = await BomHistoryModel.find({}, propFilter).lean();
    const initBomMap = createBomMap(boms);
    bomMap.push(initBomMap);
    return initBomMap;
  },
  getData() {
    return bomMap;
  },
  addData() {
    // use ryoko san's funciton to get new bom info.
    const Ryoko = [];
    const block = Ryoko;
    addedBom.push(block);
  },
  async saveData() {
    const newBomHistory = [];
    for (let i = 0; i < addedBom.length; i += 1) {
      if (bomMap.indexOf(addedBom[i]) === -1) {
        newBomHistory.push(addedBom[i]);
      }
      await new BomHistoryModel(newBomHistory).save();
      addedBom.empty();
    }
  },
};
