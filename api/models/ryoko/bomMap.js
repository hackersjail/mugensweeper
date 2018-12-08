module.exports = {
  initSet(bomCount, position) {
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
    const map = [];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7];

    for (let t = 0; t < directions.length; t += 1) {
      const posX = position.x + directions[t][0]; // 隣接するx座標
      const posY = position.y + directions[t][1]; // 隣接するy座標
      map.push({ x: posX, y: posY, bom: false });
    }

    for (let i = 0; i < bomCount; i += 1) {
      const rn = Math.floor(Math.random() * numbers.length);
      map[numbers[rn]].bom = true;
      numbers.splice(rn, 1);
    }
    return map;
  },
};
