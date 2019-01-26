const BombHistoryModel = require('./BombHistoryModel.js');
const createBombMap = require('../../routes/v1/bomb/createBombMap.js');

const propFilter = '-_id -__v';
const bombMap = [];
const unsavedBomb = [];

module.exports = {
  async initBomb() {
    bombMap.length = 0;
    unsavedBomb.length = 0;
    const bombs = await BombHistoryModel.find({}, propFilter).lean();
    bombMap.push(...createBombMap(bombs));
  },

  getBomb() {
    return [...bombMap];
  },

  addBomb(add) {
    bombMap.push(...createBombMap([add]));
    unsavedBomb.push(add);
  },

  async saveBomb() {
    await BombHistoryModel.insertMany(unsavedBomb);
    unsavedBomb.length = 0;
  },

  async deleteBomb() {
    await BombHistoryModel.deleteMany();
    unsavedBomb.length = 0;
  },
};
