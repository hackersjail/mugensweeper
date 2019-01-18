const directions = require('../../../util/directions.js')();

// Bombが置ける余剰をrateの確立で返す
module.exports = (rate, field, position) =>
  directions
    .filter(
      (data) =>
        !field.filter(
          (d) =>
            (data[0] + position.x === d.x && data[1] + position.y === d.y) ||
            (data[0] + position.x === data[0] + d.x && data[1] + +position.y === data[1] + d.y),
        ) && Math.random() < rate,
    )
    .map(([x, y]) => ({ x, y }));
