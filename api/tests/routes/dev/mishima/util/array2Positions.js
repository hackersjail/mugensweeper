module.exports = (positions) => {
  const xyLength = positions.length ** (1 / 2);
  const maxValue = Math.max(...positions);
  const board = [];
  for (let i = 1; i < maxValue + 1; i += 1) {
    const positionsIdx = positions.indexOf(i);
    const oppositionY = Math.floor(positionsIdx / xyLength);
    const Y = xyLength - 1 - oppositionY;
    const X = positionsIdx - oppositionY * xyLength;
    board.push({ x: X, y: Y });
  }
  return board;
};
