const ShiratsuchiFieldModel = require('./fieldModel.js');

const propFilter = '-_id -__v';

module.exports = {
  async initField() {
    await ShiratsuchiFieldModel.deleteMany();
    await new ShiratsuchiFieldModel({ x: 0, y: 0 }).save();
  },
  getField() {
    return ShiratsuchiFieldModel.find({}, propFilter).lean();
  },
  addBlock(block) {
    return new ShiratsuchiFieldModel(block).save();
  },
};
