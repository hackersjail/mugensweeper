const initSet = function(bomCount, position) {
  const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
  const positions = [];
  const tmp = [];

  while (tmp.length < bomCount) {
    const value = Math.floor(Math.random() * 8);
    if (!tmp.includes(value)) tmp.push(value);
  }

  directions.forEach((v, i) => {
    positions.push({
      x: position.x - v[0],
      y: position.y - v[1],
      bom: tmp.includes(i) ? 1 : 0,
    });
  });

  return positions;
};

module.exports = {
  initSet,
};
