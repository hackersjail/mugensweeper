const initSet = (bombCount, position) => {
  const directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  const bomb = [];
  const arround = [];
  while (bomb.length < bombCount) {
    const randomNum = Math.floor(Math.random() * directions.length);
    if (!bomb.includes(randomNum)) {
      bomb.push(randomNum);
    }
  }

  directions.forEach((crr, idx) => {
    arround.push({
      x: position.x + crr[0],
      y: position.y + crr[1],
      bomb: bomb.includes(idx) ? 1 : 0,
    });
  });
  return arround;
};

module.exports = {
  initSet,
};
