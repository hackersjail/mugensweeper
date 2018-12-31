// 今後のために先んじて、一部ソースを作成
// const UserModel = require('./UserModel.js');

// const propFilter = '-_id -__v';

const users = [
  {
    userName: 'test',
    userID: 'Tl9HrM',
    token:
      'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJGQXhrWXAiLCJleHAiOjE3MDQwMTQyOTgsImF1ZCI6Im11Z2Vuc3dlZXBlcnMiLCJpc3MiOiJtdWdlbnN3ZWVwZXJzIn0.Gvi5iBINEbX79l48fzDuxjUMwOy1qDRth2Tsqb-8liM',
  },
];

module.exports = {
  getUser() {
    // return UserModel.find({}, propFilter).lean();
    return [...users];
  },
  addUser(user) {
    // return new UserModel(user).save();
    users.push(user);
    return [...users];
  },
};
