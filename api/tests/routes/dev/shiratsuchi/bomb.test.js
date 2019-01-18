const bombMap = require('../../../../models/dev/shiratsuchi/bombMap.js');

const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

describe('爆弾マップのテスト', () => {
  it('原点の周囲の爆弾マップ返ってくる', async () => {
    // 1: Given
    const bombCount = Math.ceil(Math.random() * 3);
    const position = { x: 0, y: 0 };

    // 2: When
    const map = bombMap.initSet(bombCount, position);

    // 3: Then
    const mapMacher = directions.map(([x, y]) => ({ x, y }));
    const bombReturn = map.filter(({ bomb }) => bomb).length;
    expect(map).toHaveLength(8);
    expect(map.map(({ x, y }) => ({ x, y }))).toEqual(expect.arrayContaining(mapMacher));
    expect(bombReturn).toBe(bombCount);
  });
});
