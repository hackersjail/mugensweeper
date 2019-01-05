const FieldHistoryModel = require('./FieldHistoryModel.js');
const judgeField = require('../../routes/v1/util/judgeField.js');

const propFilter = '-_id -__v';
const prefield = [];
const adds = [];

module.exports = {
  async initData() {
    const pre = await FieldHistoryModel.find({}, propFilter).lean();
    prefield.push(...pre);
  },

  getData() {
    return [...prefield];
  },

  addData(add) {
    if (judgeField(prefield, add)) {
      prefield.push(add);
      adds.push(add);
    }
  },

  async saveData() {
    if (adds.lenghth !== 0) {
      await FieldHistoryModel.insertMany(adds);
      adds.length = 0;
    }
  },
};
