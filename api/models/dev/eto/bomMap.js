module.exports = {
  initSet(bombCount, position) {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const bombMap = [];
    const bombSet = [];

    // POSTされた座標の周囲で配列を生成
    for (let i = 0; i < directions.length; i += 1) {
      const arroundX = position.x + directions[i][0];
      const arroundY = position.y + directions[i][1];
      bombMap.push({
        x: arroundX,
        y: arroundY,
      });
    }

    // 与えられたBombCount分、周囲に爆弾を設置する
    while (bombCount > bombSet.length) {
      const num = Math.floor(Math.random() * bombMap.length); // 0~7の値を生成
      if (bombMap[num].bomb !== 1) {
        bombMap[num].bomb = 1;
        bombSet.push({ bomb: 1 });
      }
    }
    return bombMap;
  },
};
