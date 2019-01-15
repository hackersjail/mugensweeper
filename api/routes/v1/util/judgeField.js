const directions = require('../../../util/directions.js')();

module.exports = (add, field) => {
  let existBlock = true;
  let newBlock = false;
  const newDirs = directions.map((c) => [+add.x + c[0], +add.y + c[1]]);
  field.forEach((d) => {
    // 既に開いたblockを再度開こうとした場合はfalseを返却
    if (existBlock && d.x === +add.x && d.y === +add.y) existBlock = false;
    // 既に開いたblockの周囲8blockを開こうとした場合はtrueを返却
    if (!newBlock && newDirs.find((data) => d.x === data[0] && d.y === data[1])) newBlock = true;
  });
  return existBlock && newBlock;
};
