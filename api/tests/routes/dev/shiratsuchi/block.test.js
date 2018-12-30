const chai = require('chai');
const app = require('../../../../routes/app.js');
const array2Positions = require('./utils/array2Positions.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const ShiratsuchiFieldModel = require('../../../../models/dev/shiratsuchi/fieldModel.js');
const { initField } = require('../../../../models/dev/shiratsuchi/fieidstore.js');

const propFilter = '-_id -__v';
const initialBlock = () => ({ x: 0, y: 0 });

describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
  beforeAll(connectDB);
  beforeEach(initField);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('座標をリセットできる。', async () => {
    // 1: Given
    const positions = [{ x: 1, y: 1 }, { x: -1, y: -1 }];

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/shiratsuchi/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }
    const beforeDeletefield = await ShiratsuchiFieldModel.find({}, propFilter).lean();
    const { body } = await chai.request(app).delete('/dev/shiratsuchi/block');
    const afterDeletefield = await ShiratsuchiFieldModel.find({}, propFilter).lean();

    // 3: Then:response
    expect(lastBody).toHaveLength(positions.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(body).toEqual(expect.arrayContaining([initialBlock()]));

    // 3: Then:db
    expect(beforeDeletefield).toHaveLength(positions.length + 1);
    expect(beforeDeletefield).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(afterDeletefield).toEqual(expect.arrayContaining([initialBlock()]));
  });

  it('同じ座標にはpostしても登録されない', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/shiratsuchi/block');

    // 1: Given
    const positions = [{ x: 1, y: 1 }, { x: 1, y: 1 }];

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/shiratsuchi/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    const afterDeletefield = await ShiratsuchiFieldModel.find({}, propFilter).lean();

    // 3: Then
    // 重複削除
    const positions2 = await positions.filter(
      (v1, i1, a1) => a1.findIndex((v2) => v1.x === v2.x && v1.y === v2.y) === i1,
    );

    expect(lastBody).toHaveLength(positions2.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));

    // 3: Then:db
    expect(afterDeletefield).toHaveLength(positions2.length + 1);
    expect(afterDeletefield).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));
  });

  it('周囲の八方向のみ開ける', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/shiratsuchi/block');

    // 1: Given
    // prettier-ignore
    const positions = array2Positions([
      0,0,0,0,3,
      0,0,0,0,4,
      2,0,0,0,0,
      1,0,0,0,0,
      0,0,0,0,0,
    ]);

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/shiratsuchi/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    const afterDeletefield = await ShiratsuchiFieldModel.find({}, propFilter).lean();

    // 3: Then
    // 開いている場所の周囲八方向のみ登録
    const matchers = [{ x: 0, y: 1 }, { x: 0, y: 2 }];

    expect(lastBody).toHaveLength(matchers.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));

    // 3: Then:db
    expect(afterDeletefield).toHaveLength(matchers.length + 1);
    expect(afterDeletefield).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));
  });
});
