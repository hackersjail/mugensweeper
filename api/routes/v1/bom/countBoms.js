const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

module.exports = (bomMap, positions) => {
  const aroundPositions = [];

  // positionsの周囲8マス
  const aroundPosition = directions.map(([x, y]) => ({
    x: x + positions.x,
    y: y + positions.y,
  }));
  aroundPositions.push(...aroundPosition);

  // positionsの周囲8マスにあるBom
  const leftBlock = aroundPositions.filter((data) =>
    bomMap.find((d) => d.x === data.x && d.y === data.y),
  );

  return leftBlock.length;
};
