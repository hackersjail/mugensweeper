const FieldHistoryModel = require('./FieldHistoryModel.js');
const post2res = require('../../routes/v1/field/post2res.js');

const propFilter = '-_id -__v';
const field = [];
const unsavedField = [];

module.exports = {
  async initData() {
    const fields = await FieldHistoryModel.find({}, propFilter).lean();
    for (let i = 0; i < fields.length; i += 1) {
      const f = post2res(fields[i], field);
      field.push(f);
    }
  },

  post2Field(req) {
    const post = post2res(req, field);
    field.push(post);
    return [...field];
  },

  getData() {
    return [...field];
  },

  addData(add) {
    unsavedField.push(add);
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
