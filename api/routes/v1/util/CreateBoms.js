const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

module.exports = {
  bomMap(rate, field, positions) {
    // console.log(rate, field, positions);

    // for (let i = 0; i < positions.length; i += 1) {
    const aroundPositions2 = [];
    const aroundField2 = [];

    // positionsの周囲8マス
    const aroundPositions = directions.map(([x, y]) => ({
      x: x + positions.x,
      y: y + positions.y,
    }));
    aroundPositions2.push(...aroundPositions);

    // fieldの周囲8マス
    for (let t = 0; t < field.length; t += 1) {
      const aroundField = directions.map(([x, y]) => ({
        x: x + field[t].x,
        y: y + field[t].y,
      }));
      aroundField2.push(...aroundField);
    }

    // Bomが置ける余剰
    const leftBlock = aroundPositions2.filter(
      (data) => !aroundField2.find((d) => d.x === data.x && d.y === data.y),
    );
    // console.log(aroundPositions2);
    // console.log(aroundField2);
    return leftBlock;
    // }
  },
};
