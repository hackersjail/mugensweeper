module.exports = (bombMap, positions) =>
  bombMap.filter(
    (b) =>
      Math.abs(b.x - positions.x) <= 1 &&
      Math.abs(b.y - positions.y) <= 1 &&
      (b.x !== positions.x || b.y !== positions.y),
  ).length;
