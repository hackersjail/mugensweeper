module.exports = (array) => {
  const result = [];
  const len = Math.floor(Math.sqrt(array.length)); // 配列生成用の値

  // 全配列を生成
  for (let i = 0; i < array.length ** 2; i += 1) {
    result.push(0);
  }
  // 与えられたxとyからindexを計算
  for (let i = 0; i < array.length; i += 1) {
    const { x } = array[i];
    const { y } = array[i];
    // index[0]からの差分を算出
    const idX = Math.abs(-len - x);
    const idY = (len - y) * array.length;
    const index = idX + idY;
    const { userId } = array[i];
    const flags = array[i].actionId;
    result[index] = { u: userId, f: flags };
  }

  return result;
};
