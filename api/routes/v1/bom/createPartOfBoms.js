const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

module.exports = (rate, field, positions) => {
  const aroundFields = [];
  const boms = [];

  // fieldの周囲8マス
  for (let t = 0; t < field.length; t += 1) {
    const aroundField = directions.map(([x, y]) => [x + field[t].x, y + field[t].y]);
    aroundFields.push(...aroundField);
  }

  // Bomが置ける余剰
  const leftBlock = directions
    .map((d) => ({ x: d[0] + positions.x, y: d[1] + positions.y }))
    .filter((data) => !aroundFields.find((d) => d[0] === data.x && d[1] === data.y));

  for (let b = 0; b < leftBlock.length; b += 1) {
    if (Math.random() < rate) {
      boms.push(leftBlock[b]);
    }
  }

  return boms;
};
