const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({ x: Number, y: Number });

module.exports = mongoose.model('MiyamotoFieldModel', schema);
