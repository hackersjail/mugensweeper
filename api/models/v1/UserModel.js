const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userID: String,
  userName: String,
  createDate: String,
});

module.exports = mongoose.model('UserModel', userSchema);
