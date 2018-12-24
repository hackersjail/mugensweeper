const RyokoFieldModel = require('./FieldModel.js');

const propFilter = '-_id -__v';

module.exports = {
  async initField() {
    await RyokoFieldModel.deleteMany();
    await new RyokoFieldModel({ x: 0, y: 0 }).save();
  },
  getField() {
    return RyokoFieldModel.find({}, propFilter).lean();
  },
  addBlock(block) {
    return new RyokoFieldModel(block).save();
  },
};
