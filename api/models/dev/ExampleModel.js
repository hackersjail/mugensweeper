const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({ name: String }, { timestamps: true });

module.exports = mongoose.model('ExampleModel', schema);
