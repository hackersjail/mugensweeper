const BomHistoryModel = require('../../../../models/v1/BomHistoryModel.js');
const { initBom, getBom, addBom, saveBom } = require('../../../../models/v1/bomStore.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

describe('BomStoreに関するテスト', () => {
  beforeAll(connectDB);
  beforeEach(initBom);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('DBにbomHistoryを追加するテスト', async () => {
    // Given
    const bomHistory = [
      { x: 0, y: 2, actionId: 1 },
      { x: 4, y: 2, actionId: 2 },
      { x: 3, y: 3, actionId: 3 },
    ];
    const add = [{ x: 1, y: 2, actionId: 4 }, { x: 2, y: 2, actionId: 5 }];

    // When
    const beforeAddBom = await BomHistoryModel.insertMany(bomHistory);
    await initBom();
    add.forEach(addBom);
    const afterAddBom = getBom();
    await saveBom();
    const afterSaveBom = getBom();

    // Then
    const matchers = [
      { x: 0, y: 2 },
      { x: 4, y: 2 },
      { x: 3, y: 3 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];

    // ・DB
    expect(afterAddBom).toHaveLength(beforeAddBom.length + 2);
    expect(afterSaveBom).toHaveLength(matchers.length);
    expect(afterSaveBom).toEqual(expect.arrayContaining(matchers));
  });
});
