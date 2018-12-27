const FieldModel = require('./FieldModel.js');

const propFilter = '-_id -__v';

module.exports = {
  async initField() {
    await FieldModel.deleteMany();
    await new FieldModel({ x: 0, y: 0 }).save();
  },
  getField() {
    return FieldModel.find({}, propFilter).lean();
  },
  async addBlock(block) {
    await new FieldModel(block).save();
  },
};
