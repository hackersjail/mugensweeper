const directions = require('../../../util/directions.js')();

module.exports = (bombMap, positions) =>
  directions.filter((data) =>
    bombMap.find((d) => d.x === data[0] + positions.x && d.y === data[1] + positions.y),
  ).length;
