const createBomMap = require('../../../../routes/v1/util/createBomMap.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const BomHistoryModel = require('../../../../models/v1/BomHistoryModel.js');
const { initData } = require('../../../../models/v1/bomMapStore.js');

// const propFilter = '-_id -__v';

describe('Node.jsの起動/再起動時（サーバー⇨DB）', () => {
  beforeAll(connectDB);
  beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('Bom HistroyからBom Mapを生成し返すテスト', async () => {
    // Given
    const bomHis = [
      { x: 1, y: 0, actionId: 1 },
      { x: 2, y: 0, actionId: 2 },
      { x: 0, y: 1, actionId: 3 },
    ];

    await Promise.all(bomHis.map((block) => new BomHistoryModel(block).save()));

    // When
    const bomMap = await initData();
    const results = createBomMap(bomHis);

    // then
    const matcher = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }];

    expect(results).toEqual(expect.objectContaining(matcher));
    expect(bomMap).toEqual(expect.objectContaining(matcher));
  });
});
