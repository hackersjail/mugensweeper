const UserModel = require('./UserModel.js');

const propFilter = '-_id -__v';
const users = [];

module.exports = {
  async initUser() {
    const pre = await UserModel.find({}, propFilter).lean();
    users.push(...pre);
  },

  getUser() {
    return [...users];
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

      if (users.length < 1) {
        userId = r;
      } else {
        const find = users.find((v) => v.userId === r);
        if (!find) {
          userId = r;
        }
      }
    }
    const userData = { userName, userId };
    users.push(userData);
    await new UserModel(userData).save();
    return userData;
  },

  // 検証への使用度高関数のため保存
  // async deleteUser() {
  //   await UserModel.deleteMany();
  //   users.length = 0;
  // },
};
