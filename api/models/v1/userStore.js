const UserHistoryModel = require('./UserHistoryModel.js');

const propFilter = '-_id -__v';
const preUser = [];
const adds = [];

module.exports = {
  async initData() {
    const pre = await UserHistoryModel.find({}, propFilter).lean();
    preUser.push(...pre);
  },

  getData() {
    return [...preUser];
  },

  addData(add) {
    const userName = add;
    // ユニークな8桁のIDを生成
    const letters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // 生成する文字列に含める文字
    let userId = null;
    while (!userId) {
      let r = '';
      for (let i = 0; i < 8; i += 1) {
        r += letters[Math.floor(Math.random() * letters.length)];
      }

      if (preUser.length < 1) {
        userId = r;
      } else {
        const find = preUser.find((v) => v.userId === r);
        if (!find) {
          userId = r;
        }
      }
    }
    preUser.push({ userName, userId });
    adds.push({ userName, userId });
  },

  async saveData() {
    if (adds.lenghth !== 0) {
      await UserHistoryModel.insertMany(adds);
      adds.length = 0;
    }
  },

  // 検証への使用度高関数のため保存
  // async deleteData() {
  //   await UserHistoryModel.deleteMany();
  //   preUser.length = 0;
  // },
};
