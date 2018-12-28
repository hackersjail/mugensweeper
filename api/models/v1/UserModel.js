const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  userId: String,
  userName: String,
});

module.exports = mongoose.model('UserModel', schema);
