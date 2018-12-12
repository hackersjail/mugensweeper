const initSet = function(bomCount, position) {
  const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
  const positions = [];
  const tmp = [];

  while (tmp.length < bomCount) {
    const value = Math.floor(Math.random() * 8);
    if (!tmp.includes(value)) tmp.push(value);
  }

  [...Array(directions.length)].reduce(
    (acc, c, idx) =>
      tmp.includes(idx)
        ? positions.push({
            x: position.x - directions[idx][0],
            y: position.y - directions[idx][1],
            bom: 1,
          })
        : positions.push({
            x: position.x - directions[idx][0],
            y: position.y - directions[idx][1],
            bom: 0,
          }),
    '',
  );

  return positions;
};

module.exports = {
  initSet,
};
