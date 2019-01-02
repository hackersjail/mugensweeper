const fieldHistory2array = require('../util/fieldHistory2array.js');
const array2fieldHistory = require('../util/array2fieldHistory.js');
const FieldHistoryModel = require('../../../../models/v1/FieldHistoryModel.js');
const { initData, getData, addData, saveData } = require('../../../../models/v1/fieldStore.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

const timeStamp = Math.round(new Date().getTime() / 1000);

describe('field情報を返せるかどうか', () => {
  beforeAll(connectDB);
  beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('field historyを取得したら fieldが作成される関数のテスト', () => {
    // Given
    const fieldHistory = fieldHistory2array([
      { recordtime: timeStamp, userId: 2, x: 0, y: -1, action: 'opened', actionId: 1 },
      { recordtime: timeStamp, userId: 1, x: -1, y: -2, action: 'opened', actionId: 2 },
      { recordtime: timeStamp, userId: 3, x: 1, y: 1, action: 'opened', actionId: 3 },
      { recordtime: timeStamp, userId: 1, x: 2, y: 2, action: 'opened', actionId: 4 },
      { recordtime: timeStamp, userId: 2, x: 1, y: 2, action: 'opened', actionId: 5 },
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

  it('DBにfieldHistoryを追加するテスト', async () => {
    // Given
    // prettier-ignore
    const  fieldHistory = array2fieldHistory([
      0, 0, 0, { u: 2, f: 5 }, { u: 1, f: 4 },
      0, 0, 0, { u: 3, f: 3 }, 0,
      0, 0, 0, 0, 0,
      0, 0, { u: 2, f: 1 }, 0, 0,
      0, { u: 1, f: 2 }, 0, 0, 0,
    ]);
    // prettier-ignore
    const  add = array2fieldHistory([
      0, 0, 0, 0, 0,0,  { u: 2, f: 7 },
      0, 0, 0, 0, 0, 0, { u: 2, f: 6 },
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ]);

    // When
    const beforePostField = await Promise.all(
      fieldHistory.map((fieldHis) => new FieldHistoryModel(fieldHis).save()),
    );
    await initData();
    await addData(add);
    const afterPostField = getData();
    const db2field = fieldHistory2array(afterPostField);
    await saveData();
    const afterSaveField = getData();

    // Then
    // prettier-ignore
    const matchers = [
      0, 0, 0, 0, 0, 0, { u: 2, f: 7 },
      0, 0, 0, 0, { u: 2, f: 5 }, { u: 1, f: 4 }, { u: 2, f: 6 },
      0, 0, 0, 0,{ u: 3, f: 3 }, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, { u: 2, f: 1 }, 0, 0, 0,
      0, 0, { u: 1, f: 2 }, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ];

    expect(afterPostField).toHaveLength(beforePostField.length + 2);
    expect(afterSaveField).toHaveLength(afterPostField.length);
    expect(afterSaveField).toEqual(afterPostField);
    expect(db2field).toEqual(matchers);
  });
});
