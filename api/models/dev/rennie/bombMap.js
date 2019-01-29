module.exports.initSet = (bombNo, pos) => {
  const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
  const openedBlock = [];
  for (let i = 0; i < directions.length; i += 1) {
    const c = directions[i][0];
    const d = directions[i][1];
    const { x } = pos;
    const { y } = pos;
    openedBlock.push({ x: c + x, y: d + y, bomb: false });
  }

  const hasBomb = [];
  while (hasBomb.length < bombNo) {
    const p = Math.floor(Math.random() * openedBlock.length);
    if (openedBlock[p].bomb === false) {
      openedBlock[p].bomb = true;
      hasBomb.push(openedBlock[p]);
    }
  }
  return openedBlock;
};
