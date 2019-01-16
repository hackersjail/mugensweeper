const directions = require('../../../util/directions.js')();

module.exports = (rate, field, position) =>
  // Bombが置ける余剰をrateの確立で返す
  directions
    .map(([x, y]) => ({ x, y }))
    .filter(
      (data) =>
        !field.filter(
          (d) =>
            ((data.x + position.x === d.x && data.y + position.y === d.y) ||
              (data.x + position.x === data.x + d.x && data.y + +position.y === data.y + d.y)) &&
            Math.random() < rate,
        ),
    );
