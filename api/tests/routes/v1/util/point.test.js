const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const {
  createNewfieldWithBomMap,
  calculatePointsForAPlayer,
  generateRanking,
} = require('../../../../models/v1/pointStore.js');

describe('ブロックを開くとき', () => {
  beforeAll(connectDB);
  // beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('得点に関するテスト', async () => {
    // Given
    const fieldinfo = [
      { x: 0, y: 1, userId: 1, actionId: 1 },
      { x: 0, y: 2, userId: 2, actionId: 2 },
      { x: 1, y: 0, userId: 1, actionId: 3 },
      { x: 2, y: 1, userId: 2, actionId: 4 },
      { x: 1, y: 1, userId: 2, actionId: 5 },
      { x: 1, y: 2, userId: 1, actionId: 6 },
      { x: 1, y: 3, userId: 1, actionId: 7 },
      { x: 2, y: 3, userId: 3, actionId: 8 },
      { x: 3, y: 2, userId: 3, actionId: 9 },
      { x: 3, y: 1, userId: 4, actionId: 10 },
      { x: 2, y: 0, userId: 1, actionId: 11 },
      { x: 4, y: 1, userId: 5, actionId: 12 },
      { x: 3, y: 3, userId: 4, actionId: 13 },
      { x: 4, y: 0, userId: 1, actionId: 14 },
    ];

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
    const playerPoint = calculatePointsForAPlayer(field2, user);
    // ランキングの生成
    const ranking = generateRanking(field2);

    // Then
    expect(playerPoint).toEqual(user1Point);
    expect(ranking).toEqual(rankingMatcher);
  });
});
