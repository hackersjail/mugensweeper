const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  userName: String,
  userId: String,
  recordtime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserModel', schema);
