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
    field.length = 0;
    unsavedField.length = 0;
    for (let i = 0; i < fields.length; i += 1) {
      if (field.length > 0) {
        if (judgeField(fields[i], field)) {
          field.push(post2res(fields[i], field));
        }
      } else {
        field.push(post2res(fields[i], field));
      }
    }
  },

  getData() {
    return [...field];
  },

  addData(add) {
    const recordtime = Math.round(new Date().getTime() / 1000);
    const record = { ...add, actionId, recordtime };
    unsavedField.push(record);
    actionId += 1;
    if (judgeField(add, field)) {
      field.push(post2res(add, field));
      return { add, status: true };
    }
    return { add, status: false };
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
