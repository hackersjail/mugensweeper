const UserModel = require('./UserModel.js');

const userArray = [];

module.exports = {
  async addUser(user) {
    userArray.push(user);
    await new UserModel(user).save();
  },
  getUserIds(user) {
    if (user.userID) {
      return userArray.find((value) => value.userID === user.userID);
    }
    return null;
  },
};
