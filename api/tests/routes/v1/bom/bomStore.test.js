const BombHistoryModel = require('../../../../models/v1/BombHistoryModel.js');
const { initBomb, getBomb, addBomb, saveBomb } = require('../../../../models/v1/bombStore.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

describe('BombStoreに関するテスト', () => {
  beforeAll(connectDB);
  beforeEach(initBomb);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('DBにbombHistoryを追加するテスト', async () => {
    // Given
    const bombHistory = [
      { x: 0, y: 2, actionId: 1 },
      { x: 4, y: 2, actionId: 2 },
      { x: 3, y: 3, actionId: 3 },
    ];
    const add = [{ x: 1, y: 2, actionId: 4 }, { x: 2, y: 2, actionId: 5 }];

    // When
    const beforeAddBomb = await BombHistoryModel.insertMany(bombHistory);
    await initBomb();
    add.forEach(addBomb);
    const afterAddBomb = getBomb();
    await saveBomb();
    const afterSaveBomb = getBomb();

    // Then
    const matchers = [
      { x: 0, y: 2 },
      { x: 4, y: 2 },
      { x: 3, y: 3 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];

    // ・DB
    expect(afterAddBomb).toHaveLength(beforeAddBomb.length + 2);
    expect(afterSaveBomb).toHaveLength(matchers.length);
    expect(afterSaveBomb).toEqual(expect.arrayContaining(matchers));
  });
});
