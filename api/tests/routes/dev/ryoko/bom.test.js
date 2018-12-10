const bomMap = require('../../../../../api/models/ryoko/bomMap');

const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

describe('爆弾マップのテスト', () => {
  it('原点の周囲の爆弾マップが返ってくる', () => {
    // Given
    const bomCount = Math.ceil(Math.random() * 3);
    const position = { x: 0, y: 0 };

    // When
    const map = bomMap.initSet(bomCount, position);
    // [{x,y,bom: t|f},...]

    // Then
    const mapMatcher = directions.map(([x, y]) => ({ x, y }));
    const bomReturn = map.filter(({ bom }) => bom).length;
    expect(map).toHaveLength(8);
    expect(map.map(({ x, y }) => ({ x, y }))).toMatchObject(
      expect.arrayContaining([...mapMatcher]),
    );
    expect(bomReturn).toBe(bomCount);
  });
});
