const array2fieldHistory = require('./array2fieldHistory.js');
const array2bomMap = require('./array2bomMap.js');

const {
  createNewfieldWithBomMap,
  calculatePointsForPlayer,
  generateRanking,
} = require('../../../../models/v1/pointStore.js');

const time = Math.round(new Date().getTime() / 1000);
const ZERO00000 = 0;

describe('ブロックを開くとき', () => {
  it('得点に関するテスト', () => {
    // Given
    // prettier-ignore
    const fieldHistory = array2fieldHistory([
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000,
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, 'u1:7:op', 'u3:8:op', 'u4:13:op',ZERO00000,
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, 'u2:2:op', 'u1:6:op', ZERO00000, 'u3:9:op', ZERO00000,
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, 'u1:1:op', 'u2:5:op', 'u2:4:op', 'u4:10:op','u5:12:op',
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, 'u1:3:op', 'u1:11:op', ZERO00000,'u1:14:op',
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000,
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000,
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000,
      ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000, ZERO00000,
    ], time);

    // prettier-ignore
    const bomMap = array2bomMap([
        0, 0, 0, 0, 0, 7, 0, 8, 13,
        0, 0, 0, 0, 2, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 4, 12,
        0, 0, 0, 0, 0, 3, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 10,0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);

    const rankingMatcher = [
      { userId: 1, points: 3 },
      { userId: 4, points: 2 },
      { userId: 5, points: 1 },
      { userId: 2, points: 0 },
      { userId: 3, points: 0 },
    ];

    // fieldHistoryとbomHistoryを使って爆弾情報を含んだfieldの生成
    const fieldWithBomMap = createNewfieldWithBomMap(fieldHistory, bomMap);

    // １人のuserのpointを計算のテスト
    // when
    rankingMatcher.forEach((rank) => {
      const player = calculatePointsForPlayer(fieldWithBomMap, rank.userId);
      // Then
      expect(player).toEqual(rank);
    });

    // Rankingのテスト
    // When
    const ranking = generateRanking(fieldWithBomMap);
    // Then
    expect(ranking).toEqual(rankingMatcher);
  });
});
