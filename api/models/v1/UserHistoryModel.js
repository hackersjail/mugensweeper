const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  userName: String,
  userId: String,
  recordtime: Number,
});

module.exports = mongoose.model('UserHistoryModel', schema);
