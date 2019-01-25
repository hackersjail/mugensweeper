const directions = require('../../../util/directions.js')();

// Bombが置ける余剰をrateの確立で返す
module.exports = (rate, field, position) =>
  directions
    .map(([x, y]) => ({ x: Number(position.x) + x, y: Number(position.y) + y }))
    .filter(
      (d) =>
        !field.find((f) => Math.abs(f.x - d.x) <= 1 && Math.abs(f.y - d.y) <= 1) &&
        Math.random() < rate,
    );
