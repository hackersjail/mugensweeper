const array2fieldHistory = require('./array2fieldHistory.js');
const {
  createNewfieldWithBomMap,
  calculatePointsForPlayer,
  generateRanking,
} = require('../../../../models/v1/pointStore.js');

const time = Math.round(new Date().getTime() / 1000);

describe('ブロックを開くとき', () => {
  it('得点に関するテスト', () => {
    // Given
    // prettier-ignore
    const fieldinfo = array2fieldHistory([
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, { t:time, u: 1, f: 7 }, { t:time, u: 3, f: 8 }, { t:time, u: 4, f: 13 }, 0,
      0, 0, 0, 0, { t:time, u: 2, f: 2 }, { t:time, u: 1, f: 6 }, 0, { t:time, u: 3, f: 9 }, 0,
      0, 0, 0, 0, { t:time, u: 1, f: 1 }, { t:time, u: 2, f: 5 }, { t:time, u: 2, f: 4 }, { t:time, u: 4, f: 10 }, { t:time, u: 5, f: 12 },
      0, 0, 0, 0, 0, { t:time, u: 1, f: 3 }, { t:time, u: 1, f: 11 }, 0, { t:time, u: 1, f: 14 },
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);

    const bomMap = [
      { x: 1, y: 2, actionId: 1 },
      { x: 0, y: 3, actionId: 2 },
      { x: 1, y: 1, actionId: 3 },
      { x: 3, y: 2, actionId: 4 },
      { x: 1, y: 4, actionId: 7 },
      { x: 3, y: 4, actionId: 8 },
      { x: 3, y: 0, actionId: 10 },
      { x: 4, y: 2, actionId: 12 },
      { x: 4, y: 4, actionId: 13 },
    ];
    const rankingMatcher = [
      { userId: 1, points: 3 },
      { userId: 4, points: 2 },
      { userId: 5, points: 1 },
      { userId: 2, points: 0 },
      { userId: 3, points: 0 },
    ];
    const user = { userId: 1 };
    const user1Point = [{ userId: 1, points: 3 }];
    // When
    // fieldHistoryとbomHistoryを使って爆弾情報を含んだfieldの生成
    const field2 = createNewfieldWithBomMap(fieldinfo, bomMap);
    // １人のuserのpointを計算
    const playerPoint = calculatePointsForPlayer(field2, user);
    // ランキングの生成
    const ranking = generateRanking(field2);

    // Then
    expect(playerPoint).toEqual(user1Point);
    expect(ranking).toEqual(rankingMatcher);
  });
});
