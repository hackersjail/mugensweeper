module.exports = (array) => {
  const result = [];
  const result2 = [];
  const len = Math.sqrt(array.length); // 1辺の長さ
  const num = Math.floor(len / 2); // 周囲計算用の数値

  // 全配列を生成
  for (let y = num; y > -num - 1; y -= 1) {
    for (let x = -num; x < num + 1; x += 1) {
      result.push({ x, y });
    }
  }

  for (let i = 0; i < array.length; i += 1) {
    // 0以外のindexを取得
    if (array[i] !== 0) {
      const userId = array[i].u;
      const flags = array[i].f;
      const time = array[i].t;
      const index = array.indexOf(array[i]);
      const res = result.slice(index, index + 1)[0];
      res.userId = userId;
      res.actionId = flags;
      res.recordtime = time;
      res.action = 'opened';
      result2.push(res);
    }
  }
  result2.sort((a, b) => a.actionId - b.actionId);

  return result2;
};
