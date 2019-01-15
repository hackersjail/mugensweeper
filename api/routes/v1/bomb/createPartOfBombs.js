const directions = require('../../../util/directions.js')();

module.exports = (rate, field, position) => {
  const aroundFields = [];

  // fieldの周囲8マス
  for (let t = 0; t < field.length; t += 1) {
    const aroundField = directions.map(([x, y]) => [x + field[t].x, y + field[t].y]);
    aroundFields.push(...aroundField);
  }

  // Bombが置ける余剰をrateの確立で返す
  return directions
    .map((around) => ({ x: around[0] + position.x, y: around[1] + position.y }))
    .filter((data) => !aroundFields.find((f) => f[0] === data.x && f[1] === data.y))
    .filter(() => Math.random() < rate);
};
