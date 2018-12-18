const RyokoFieldModel = require('./FieldModel.js');

const propFilter = '-_id -__v';

module.exports = {
  async initField() {
    await RyokoFieldModel.remove();
    await new RyokoFieldModel({ x: 0, y: 0 }).save();
  },
  getField() {
    return RyokoFieldModel.find({}, propFilter).lean();
  },
  async addBlock(block) {
    await new RyokoFieldModel(block).save();
  },
};
