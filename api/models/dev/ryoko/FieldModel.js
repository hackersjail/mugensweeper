const mongoose = require('mongoose'); // mapper

const { Schema } = mongoose;
const schema = new Schema({ x: Number, y: Number });
module.exports = mongoose.model('RyokoFieldModel', schema);
