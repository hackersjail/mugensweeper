const { bomHis } = require('../../../../routes/v1/field/bomMapHistory.js');

describe('Node.jsの起動/再起動時（サーバー⇨DB）', () => {
  it('bom mapのhistroyを取得したら、fieldに反映される関数のテスト', async () => {
    // Given
    const positions = [
      { x: 1, y: 0, actionID: 1 },
      { x: 2, y: 0, actionID: 2 },
      { x: 0, y: 1, actionID: 3 },
    ];
    // When
    const lastResult = [];
    for (let i = 0; i < positions.length; i += 1) {
      const result = bomHis(positions[i].x, positions[i].y);
      lastResult.push(result);
    }

    // then
    const matcher = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }];
    // const result = positions.map(({ x, y }) => ({ x, y }));

    expect(lastResult).toEqual(expect.objectContaining(matcher));
  });
});
