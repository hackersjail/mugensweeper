const array2fieldHistory = require('../util/array2fieldHistory.js');
const FieldHistoryModel = require('../../../../models/v1/FieldHistoryModel.js');
const { initData, getData, addData, saveData } = require('../../../../models/v1/fieldStore.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

const time = Math.round(new Date().getTime() / 1000);

describe('field情報を返せるかどうか', () => {
  beforeAll(connectDB);
  beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('配列をfield historyに変換する関数のテスト', () => {
    // Given
    // prettier-ignore
    const fieldHistory = array2fieldHistory([
      0, 0, 0, { t:time, u: 2, f: 5 }, { t:time, u: 1, f: 4 },
      0, 0, 0, { t:time, u: 3, f: 3 }, 0,
      0, 0, 0, 0, 0,
      0, 0, { t:time, u: 2, f: 1 }, 0, 0,
      0, { t:time, u: 1, f: 2 }, 0, 0, 0,
    ]);

    const fieldHistory2 = [
      { recordtime: time, userId: 2, x: 0, y: -1, action: 'opened', actionId: 1 },
      { recordtime: time, userId: 1, x: -1, y: -2, action: 'opened', actionId: 2 },
      { recordtime: time, userId: 3, x: 1, y: 1, action: 'opened', actionId: 3 },
      { recordtime: time, userId: 1, x: 2, y: 2, action: 'opened', actionId: 4 },
      { recordtime: time, userId: 2, x: 1, y: 2, action: 'opened', actionId: 5 },
    ];
    // Then
    expect(fieldHistory).toEqual(expect.arrayContaining(fieldHistory2));
  });

  it('DBにfieldHistoryを追加するテスト', async () => {
    // Given
    // prettier-ignore
    const fieldHistory = array2fieldHistory([
      0, 0, 0, { t:time, u: 2, f: 5 }, { t:time, u: 1, f: 4 },
      0, 0, 0, { t:time, u: 3, f: 3 }, 0,
      0, 0, 0, 0, 0,
      0, 0, { t:time, u: 2, f: 1 }, 0, 0,
      0, { t:time, u: 1, f: 2 }, 0, 0, 0,
    ]);
    // prettier-ignore
    const add = array2fieldHistory([
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, { t:time, u: 2, f: 6 },
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ]);

    // When
    const beforePostField = await FieldHistoryModel.insertMany(fieldHistory);
    await initData();
    Promise.all(add.map((adds) => addData(adds)));
    const afterPostField = getData();
    await saveData();
    const afterSaveField = getData();

    // Then
    // prettier-ignore
    const matchers = array2fieldHistory([
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, { t:time, u: 2, f: 5 }, { t:time, u: 1, f: 4 }, { t:time, u: 2, f: 6 },
      0, 0, 0, 0, { t:time, u: 3, f: 3 }, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, { t:time, u: 2, f: 1 }, 0, 0, 0,
      0, 0, { t:time, u: 1, f: 2 }, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ]);

    expect(afterPostField).toHaveLength(beforePostField.length + 1);
    expect(afterSaveField).toEqual(expect.arrayContaining(matchers));
  });
});
