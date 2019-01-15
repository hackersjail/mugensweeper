const bombMap = require('../../../../../api/models/dev/ryoko/bombMap');

const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

describe('爆弾マップのテスト', () => {
  it('原点の周囲の爆弾マップが返ってくる', () => {
    // Given
    const bombCount = Math.ceil(Math.random() * 3);
    const position = { x: 0, y: 0 };

    // When
    const map = bombMap.initSet(bombCount, position);
    // [{x,y,bomb: t|f},...]

    // Then
    const mapMatcher = directions.map(([x, y]) => ({ x, y }));
    const bombReturn = map.filter(({ bomb }) => bomb).length;
    expect(map).toHaveLength(8);
    expect(map.map(({ x, y }) => ({ x, y }))).toMatchObject(
      expect.arrayContaining([...mapMatcher]),
    );
    expect(bombReturn).toBe(bombCount);
  });
});
