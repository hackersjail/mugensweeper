// 今後のために先んじて、一部ソースを作成
// const UserModel = require('./UserModel.js');

// const propFilter = '-_id -__v';

const users = [
  {
    userName: 'test',
    userID: 'Tl9HrM',
    token:
      'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJUbDlIck0iLCJleHAiOjE1NDYxNDIzMDYsImF1ZCI6Im11Z2Vuc3dlZXBlcnMiLCJpc3MiOiJtdWdlbnN3ZWVwZXJzIn0.Oi8HZI5Ay0I6WOurkZU9KUohdn9dL4TMbRkJA8bjXrM',
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
