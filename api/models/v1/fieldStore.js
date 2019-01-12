const FieldHistoryModel = require('./FieldHistoryModel.js');
const judgeField = require('../../routes/v1/util/judgeField.js');
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

  getData() {
    return [...field];
  },

  addData(add) {
    if (judgeField(add, field)) {
      field.push(post2res(add, field));
      unsavedField.push({
        x: add.x,
        y: add.y,
        userId: add.userId,
        actionId: add.actionId,
        recordtime: add.recordtime,
        action: add.action,
        status: true,
      });
    } else {
      unsavedField.push({
        x: add.x,
        y: add.y,
        userId: add.userId,
        actionId: add.actionId,
        recordtime: add.recordtime,
        action: add.action,
        status: false,
      });
    }
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
