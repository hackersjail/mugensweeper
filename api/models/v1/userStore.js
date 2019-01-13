const getHash = require('random-hash');
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
    let userId = '';
    let flag = 0;
    while (flag === 0) {
      userId = getHash.generateHash({ length: 8 });
      if (userId.indexOf('-') === -1 && userId.indexOf('_') === -1) {
        /* eslint no-loop-func: 0 */
        const find = users.find((v) => v.userId === userId);
        if (!find) flag = 1;
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
