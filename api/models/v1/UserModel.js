const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  userId: String,
  userName: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserModel', schema);
