module.exports = {
  initSet(bomCount, position) {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const bomMap = [];
    const bomSet = [];

    // POSTされた座標の周囲で配列を生成
    for (let i = 0; i < directions.length; i += 1) {
      const arroundX = position.x + directions[i][0];
      const arroundY = position.y + directions[i][1];
      bomMap.push({
        x: arroundX,
        y: arroundY,
      });
    }

    // 与えられたBomCount分、周囲に爆弾を設置する
    while (bomCount > bomSet.length) {
      const num = Math.floor(Math.random() * bomMap.length); // 0~8の値を生成
      if (bomMap[num].bom !== 1) {
        bomMap[num].bom = 1;
        bomSet.push({ bom: 1 });
      }
    }
    return bomMap;
  },
};
