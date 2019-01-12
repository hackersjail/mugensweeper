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
  getData() {
    // return [...prefield, ...adds];
    return [
      // フロント開発用
      { x: 0, y: 0, userId: 'gameMaster', exploded: false, bomCount: 0 },
      { x: 0, y: 1, userId: 'abcdefg', exploded: false, bomCount: 0 },
      { x: 1, y: 1, userId: 'abcdefg', exploded: false, bomCount: 0 },
      { x: -1, y: 0, userId: '1234567', exploded: false, bomCount: 2 },
      { x: -1, y: -1, userId: '1234567', exploded: true, bomCount: 0 },
      { x: -1, y: 1, userId: '1234abc', exploded: false, bomCount: 1 },
      { x: 0, y: -1, userId: '1234abc', exploded: false, bomCount: 3 },
    ];
  },
  addBlock(block) {
    return new MiyamotoFieldModel(block).save();
  },
};
