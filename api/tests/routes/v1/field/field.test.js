const fieldHistory2array = require('../util/fieldHistory2array.js');

describe('field情報を返せるかどうか', () => {
  it('field historyを取得したら fieldが作成される関数のテスト', async () => {
    // Given
    const fieldHistory = fieldHistory2array([
      { recordtime: 1545819243, userId: 2, x: 0, y: -1, action: 'opened', actionId: 1 },
      { recordtime: 1545819253, userId: 1, x: -1, y: -2, action: 'opened', actionId: 2 },
      { recordtime: 1545819263, userId: 3, x: 1, y: 1, action: 'opened', actionId: 3 },
      { recordtime: 1545819273, userId: 1, x: 2, y: 2, action: 'opened', actionId: 4 },
      { recordtime: 1545819283, userId: 2, x: 1, y: 2, action: 'opened', actionId: 5 },
    ]);

    // prettier-ignore
    const  fieldHistory2 = [
      0, 0, 0, { u: 2, f: 5 }, { u: 1, f: 4 },
      0, 0, 0, { u: 3, f: 3 }, 0,
      0, 0, 0, 0, 0,
      0, 0, { u: 2, f: 1 }, 0, 0,
      0, { u: 1, f: 2 }, 0, 0, 0,
    ]
    // When

    // Then
    expect(fieldHistory).toEqual(fieldHistory2);
  });
});
