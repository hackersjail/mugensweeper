const FieldHistoryModel = require('./FieldHistoryModel.js');
const judgeField = require('../../routes/v1/util/judgeField.js');

const propFilter = '-_id -__v';
const getdata = FieldHistoryModel.find({}, propFilter).lean();
const prefield = [];
const addfield = [];

module.exports = {
  async initData() {
    const pre = await getdata;
    for (let i = 0; i < pre.length; i += 1) {
      prefield.push(pre[i]);
    }
  },

  getData() {
    return getdata;
  },

  addData(add) {
    judgeField(prefield, add);
    if (true) {
      addfield.push(add);
    }
    return prefield;
  },

  async saveData() {
    return new FieldHistoryModel(addfield[0]).save();
  },
};
