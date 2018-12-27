const EtoFieldModel = require('./EtoFieldModel.js');

const propFilter = '-_id -__v';

module.exports = {
  async initField() {
    await EtoFieldModel.deleteMany();
    await new EtoFieldModel({ x: 0, y: 0 }).save();
  },

  getField() {
    return EtoFieldModel.find({}, propFilter).lean();
  },
  addBlock(block) {
    return new EtoFieldModel(block).save();
  },
};
