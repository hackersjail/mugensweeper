module.exports = {
  // initSet(bomCount, position) {
  //   // 原点の周囲の座標追加
  //   const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
  //   const map = directions.map(
  //     (a, b, c) => a && { x: position.x + c[b][0], y: position.y + c[b][1], bom: false },
  //   );

  //   // 原点の周囲の爆弾マップ追加
  //   const num = [0, 1, 2, 3, 4, 5, 6, 7];
  //   for (let i = 0; i < bomCount; i += 1) {
  //     const rn = Math.floor(Math.random() * num.length);
  //     map[num[rn]].bom = true;
  //     num.splice(rn, 1);
  //   }
  //   return map;
  // },

  initSet2(bomCount) {
    const center = { x: 0, y: 0, bom: false, vacancy: 0 };

    // 原点の周囲の座標追加
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
    const map = directions.map(
      (a, b, c) => a && { x: center.x + c[b][0], y: center.y + c[b][1], bom: false },
    );

    // 原点の周囲の爆弾マップ追加
    const num = [0, 1, 2, 3, 4, 5, 6, 7];
    for (let i = 0; i < bomCount; i += 1) {
      const rn = Math.floor(Math.random() * num.length);
      map[num[rn]].bom = true;
      num.splice(rn, 1);
    }

    // 1手目の座標とその周囲の座標追加
    // for (let m = 0; m < map.length; m += 1) {
    //   if (positions.x === map[m].x && positions.y === map[m].y) {
    //     map[m].bom;
    //   }
    // }
    map.unshift(center);
    // console.log(positions);
    // console.log(map);
    return map;
  },
};
