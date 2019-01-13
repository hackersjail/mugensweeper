const createBomMap = require('../../../../routes/v1/bom/createBomMap.js');

describe('Node.jsの起動/再起動時（サーバー⇨DB）', () => {
  it('Bom HistroyからBom Mapを生成し返すテスト', () => {
    // Given
    const bomHis = [
      { x: 1, y: 0, actionId: 1 },
      { x: 2, y: 0, actionId: 2 },
      { x: 0, y: 1, actionId: 3 },
    ];
    // When
    const results = createBomMap(bomHis);

    // then
    const matcher = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }];

    expect(results).toEqual(expect.objectContaining(matcher));
  });
});
