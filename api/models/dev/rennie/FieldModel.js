const mongoose = require('mongoose'); // mongoDS専用の言語がmongoose MongoDBのデーターを操作する

const { Schema } = mongoose;
const schema = new Schema({ x: Number, y: Number });

module.exports = mongoose.model('FieldModel', schema);
