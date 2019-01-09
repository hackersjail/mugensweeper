const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

module.exports = (bomMap, positions) =>
  directions.filter((data) =>
    bomMap.find((d) => d.x === data[0] + positions.x && d.y === data[1] + positions.y),
  ).length;
// return leftBlock.length;
