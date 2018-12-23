const bomMap = require('../../../../models/shiratsuchi/bomMap.js');

const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

describe('爆弾マップのテスト', () => {
  it('原点の周囲の爆弾マップ返ってくる', async () => {
    // 1: Given
    const bomCount = Math.ceil(Math.random() * 3);
    const position = { x: 0, y: 0 };

    // 2: When
    const map = bomMap.initSet(bomCount, position);
    // [{x,y,bom t|f}...]こんな要素で返ってくる

    // 3: Then
    const mapMacher = directions.map(([x, y]) => ({ x, y }));
    const bomReturn = map.filter(({ bom }) => bom).length;
    expect(map).toHaveLength(8);
    expect(map.map(({ x, y }) => ({ x, y }))).toEqual(expect.arrayContaining(mapMacher));
    expect(bomReturn).toBe(bomCount);
  });
});
