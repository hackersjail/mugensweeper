module.exports = (array) => {
  const len = array.length; // 与えられた配列の長さ
  const hen = Math.sqrt(len); // 1辺の長さ
  const startPoint = hen * (hen - 1); // 開始地点のindex
  const num = []; // 値が入っている座標のindex
  const openPoint = []; // クリックした場所
  const result = []; // 座標を入れる配列

  // 値ありの座標を取得する;
  for (let i = 0; i < len; i += 1) {
    if (array[i] !== 0) {
      num.push(array[i]); // 手番を取得
      openPoint.push(array.indexOf(array[i])); // インデックスを取得
    }
  }

  // 取得した座標を元に配列を生成する
  for (let i = 0; i < openPoint.length; i += 1) {
    const diff = openPoint[i] - startPoint; // 開始地点からの差を算出
    const idy = Math.abs(Math.floor(diff / hen)); // 差を1辺のかずで割った値(y座標)
    const idx = openPoint[i] % hen; // １辺の数で割った余り(x座標)
    result.push({ x: idx, y: idy, index: num[i] });
  }

  // indexの値でresultをソート(手番順にする)
  result.sort((a, b) => a.index - b.index);

  return result;
};
