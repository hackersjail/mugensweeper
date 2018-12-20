const UserModel = require('./userModel.js');
const propFilter = '-_id -__v';

module.exports = {
   addUser(user) {
    return  new UserModel(user).save();
  },
   getUser() {
    return UserModel.find({},propFilter).lean();
  },
};
