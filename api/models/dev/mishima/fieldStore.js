const FieldModel = require('./FieldModel.js');

const propFilter = '-_id -__v';

module.exports = {
  async initField() {
    await FieldModel.remove();
    await new FieldModel({ x: 0, y: 0 }).save();
  },
  async getField() {
    const field = await FieldModel.find({}, propFilter).lean();
    return field;
  },
  async addBlock(block) {
    await new FieldModel(block).save();
  },
};
