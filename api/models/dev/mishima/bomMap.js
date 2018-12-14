const initSet = (bomCount, position) => {
  const directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  const bom = [];
  const arround = [];
  while (bom.length < bomCount) {
    const randomNum = Math.floor(Math.random() * directions.length);
    if (!bom.includes(randomNum)) {
      bom.push(randomNum);
    }
  }

  directions.forEach((crr, idx) => {
    arround.push({
      x: position.x + crr[0],
      y: position.y + crr[1],
      bom: bom.includes(idx) ? 1 : 0,
    });
  });
  return arround;
};

module.exports = {
  initSet,
};
