const MiyamotoFieldModel = require('./FieldModel.js');

const propFilter = '-_id -__v';

module.exports = {
  async initField() {
    await MiyamotoFieldModel.deleteMany();
    await new MiyamotoFieldModel({ x: 0, y: 0 }).save();
  },
  getField() {
    return MiyamotoFieldModel.find({}, propFilter).lean();
  },
  addBlock(block) {
    return new MiyamotoFieldModel(block).save();
  },
};
