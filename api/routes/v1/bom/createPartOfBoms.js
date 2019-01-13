const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

module.exports = (rate, field, positions) => {
  const aroundFields = [];
  const boms = [];

  // positionsの周囲8マス
  const aroundPositions = directions.map(([x, y]) => ({
    x: x + positions.x,
    y: y + positions.y,
  }));

  // fieldの周囲8マス
  for (let t = 0; t < field.length; t += 1) {
    const aroundField = directions.map(([x, y]) => ({
      x: x + field[t].x,
      y: y + field[t].y,
    }));
    aroundFields.push(...aroundField);
  }

  // Bomが置ける余剰
  const leftBlock = aroundPositions.filter(
    (data) => !aroundFields.find((d) => d.x === data.x && d.y === data.y),
  );

  for (let b = 0; b < leftBlock.length; b += 1) {
    if (Math.random() < rate) {
      boms.push(leftBlock[b]);
    }
  }

  return boms;
};
