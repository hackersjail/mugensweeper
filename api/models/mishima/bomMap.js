module.exports.initSet = (bomCount, position) => {
  const directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  const bom = [];
  const arround = [];
  while (bom.length < bomCount) {
    const randomNum = Math.floor(Math.random() * directions.length);
    if (bom.indexOf(randomNum) < 0) {
      bom.push(randomNum);
    }
  }

  for (let i = 0; i < directions.length; i += 1) {
    const idx = bom.indexOf(i);
    const x = position.x + directions[i][0];
    const y = position.y + directions[i][1];
    if (idx >= 0) {
      arround.push({ x, y, bom: true });
    } else {
      arround.push({ x, y, bom: false });
    }
  }

  return arround;
};
