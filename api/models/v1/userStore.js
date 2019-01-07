const UserModel = require('./UserModel.js');

const propFilter = '-_id -__v';
const preUser = [];

module.exports = {
  async initUser() {
    const pre = await UserModel.find({}, propFilter).lean();
    preUser.push(...pre);
  },

  getUser() {
    return [...preUser];
  },

  async addUser(userName) {
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
    await UserModel.insertMany({ userName, userId });
    return { userName, userId };
  },

  // 検証への使用度高関数のため保存
  // async deleteUser() {
  //   await UserModel.deleteMany();
  //   preUser.length = 0;
  // },
};
