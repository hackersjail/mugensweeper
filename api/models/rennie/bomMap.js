module.exports = {
  initSet(bomNo, pos) {
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];
    const openedBlock = [];
    for (let i = 0; i < directions.length; i + 1) {
      const c = directions[i][0];
      const d = directions[i][1];
      const { x } = pos;
      const { y } = pos;
      openedBlock.push({ x: c + x, y: d + y, bom: false });
    }
    let h = 0;
    const hasBom = [];
    while (h < bomNo) {
      const p = Math.ceil(Math.random() * openedBlock.length - 1);
      if (openedBlock[p].bom === false) {
        openedBlock[p].bom = true;
        hasBom.push(openedBlock[p]);
        h += 1;
        break;
      }
    }
    // const length = hasBom.length;
    // console.log({ length, openedBlock });
    return openedBlock;
  },
};
