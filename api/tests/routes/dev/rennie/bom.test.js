const bombMap = require('../../../../models/dev/rennie/bombMap.js');

const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];

describe('爆弾マップのテスト', () => {
  it('原点の周囲の爆弾マップが返ってくる', () => {
    // Given
    const bombCount = Math.ceil(Math.random() * 3);
    const position = { x: 0, y: 0 };

    // when
    const map = bombMap.initSet(bombCount, position);
    // Then
    // 期待する配列
    const mapMatchers = directions.map(([x, y]) => ({ x, y })); // 原点だからそのまま
    const bombReturn = map.filter(({ bomb }) => bomb).length;
    expect(map).toHaveLength(8);
    expect(map.map(({ x, y }) => ({ x, y }))).toEqual(expect.arrayContaining(mapMatchers));
    expect(bombReturn).toBe(bombCount);
  });
});
