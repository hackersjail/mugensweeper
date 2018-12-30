const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({ x: Number, y: Number, actionId: Number });

module.exports = mongoose.model('BomHistoryModel', schema);
