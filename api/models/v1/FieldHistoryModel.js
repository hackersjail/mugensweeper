const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  recordtime: Number,
  userId: Number,
  x: Number,
  y: Number,
  action: String,
  actionId: Number,
});

module.exports = mongoose.model('FieldHistoryModel', schema);
