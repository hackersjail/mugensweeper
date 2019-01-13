const FieldHistoryModel = require('./FieldHistoryModel.js');
const judgeField = require('../../routes/v1/util/judgeField.js');
const post2res = require('../../routes/v1/field/post2res.js');

const propFilter = '-_id -__v';
const field = [];
const unsavedField = [];
let actionId = 1;

module.exports = {
  async initData() {
    const fields = await FieldHistoryModel.find({}, propFilter).lean();
    actionId = fields.length;
    unsavedField.length = 0;
    for (let i = 0; i < fields.length; i += 1) {
      const f = post2res(fields[i], field);
      field.push(f);
    }
  },

  getData() {
    return [...field];
  },

  addData(add) {
    const status = !!judgeField(add, field);
    const record = { ...add, actionId, status };

    if (record.status) field.push(post2res(add, field));

    actionId += 1;
    unsavedField.push(record);
    return record.status;
  },

  async saveData() {
    if (unsavedField.lenghth !== 0) {
      await FieldHistoryModel.insertMany(unsavedField);
      unsavedField.length = 0;
    }
  },

  // 検証への使用度高関数のため保存
  // async deleteData() {
  //   await FieldHistoryModel.deleteMany();
  //   prefield.length = 0;
  // },
};
