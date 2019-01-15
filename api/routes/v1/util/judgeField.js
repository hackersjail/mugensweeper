const directions = require('../../../util/directions.js')();

module.exports = (add, field) => {
  let newBlock = false;
  const newDirs = directions.map((c) => [+add.x + c[0], +add.y + c[1]]);
  for (let i = 0; i < field.length; i += 1) {
    // 既に開いたblockを再度開こうとした場合はfalseを返却
    if (field[i].x === +add.x && field[i].y === +add.y) return false;
    // 既に開いたblockの周囲8blockを開こうとした場合はtrueを返却
    if (!newBlock && newDirs.find((data) => field[i].x === data[0] && field[i].y === data[1]))
      newBlock = true;
  }
  return newBlock;
};
