module.exports = {
  initSet(bombCount, position) {
    // 原点の周囲の座標追加
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
    const map = directions.map(
      (a, b, c) => a && { x: position.x + c[b][0], y: position.y + c[b][1], bomb: false },
    );
    // 原点の周囲の爆弾マップ追加
    const locate = [];
    while (locate.length < bombCount) {
      const rn = Math.floor(Math.random() * directions.length);
      if (!locate.includes(rn)) {
        locate.push(rn);
        map[rn].bomb = true;
      }
    }
    return map;
  },
};
