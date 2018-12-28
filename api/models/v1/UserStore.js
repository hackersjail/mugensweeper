const UserModel = require('./UserModel.js');

const propFilter = '-_id -__v';

module.exports = {
  addUser(user) {
    return UserModel(user).save();
  },
  getUser() {
    return UserModel.find({}, propFilter).lean();
  },
  getUserIds() {
    return UserModel.find({}, { _id: 0, userId: 1 }).lean();
  },
};
