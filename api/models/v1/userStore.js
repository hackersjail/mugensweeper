const getHash = require('random-hash');
const UserModel = require('./UserModel.js');
const generateAccessToken = require('../../routes/v1/authentication/generateAccessToken.js');

const propFilter = '-_id -__v';
const users = [];
// charsetについては、random-hashの性質上、文言数を2乗の数分準備しなければならないため、aを多めに指定
const option = {
  length: 8,
  charset: 'aaabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

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
    const find = (v) => v.userId === userId;
    while (users.find(find)) {
      userId = getHash.generateHash(option);
    }

    const userData = { userName, userId };
    users.push(userData);
    await new UserModel(userData).save();
    return { userName, userId, token: generateAccessToken(userId) };
  },

  // 検証への使用度高関数のため保存
  // async deleteUser() {
  //   await UserModel.deleteMany();
  //   users.length = 0;
  // },
};
