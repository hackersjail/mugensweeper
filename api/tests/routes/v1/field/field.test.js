const fieldHistory2array = require('../util/fieldHistory2array.js');
const FieldHistoryModel = require('../../../../models/v1/FieldHistoryModel.js');
const { initData, addData } = require('../../../../models/v1/fieldStore.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

// const propFilter = '-_id -__v';
const now = Date.now();
// const initialBlock = { x: 0, y: 0, action: 'opened', actionId: 0 };

describe('field情報を返せるかどうか', () => {
  beforeAll(connectDB);
  beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('field historyを取得したら fieldが作成される関数のテスト', () => {
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
  it('DBにfieldHistoryを保存するテスト', async () => {
    // Given
    const fieldHistory = [
      { recordtime: now, userId: 2, x: 0, y: -1, action: 'opened', actionId: 1 },
      { recordtime: now, userId: 1, x: -1, y: -2, action: 'opened', actionId: 2 },
      { recordtime: now, userId: 3, x: 1, y: 1, action: 'opened', actionId: 3 },
      { recordtime: now, userId: 1, x: 2, y: 2, action: 'opened', actionId: 4 },
      { recordtime: now, userId: 2, x: 1, y: 2, action: 'opened', actionId: 5 },
    ];

    await addData(Promise.all(fieldHistory.map((field) => new FieldHistoryModel(field).save())));

    // When
    // const field = await FieldHistoryModel.find({}, propFilter).lean();

    // Then
  });
  it('DBにfieldを追加するテスト', async () => {
    // Given
    const fieldHistory = [
      { recordtime: now, userId: 2, x: 0, y: -1, action: 'opened', actionId: 1 },
      { recordtime: now, userId: 1, x: -1, y: -2, action: 'opened', actionId: 2 },
    ];

    // When
    await addData(Promise.all(fieldHistory.map((field) => new FieldHistoryModel(field).save())));

    // Then
    // expect(field).toHaveLength(fieldHistory.length + 1); // 初期座標を含めて返す
    // expect(field).arrayContaining([initialBlock, ...field]); // 中身の確認
  });
});
