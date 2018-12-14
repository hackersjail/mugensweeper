const chai = require('chai');
const app = require('../../../../routes/app.js');
const array2Positions = require('./utils/array2Positions');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const FieldModel = require('../../../../models/dev/ryoko/FieldModel.js');
const { initField } = require('../../../../models/dev/ryoko/fieldStore.js');

const propFilter = '-_id -__v';

const initialBlock = () => ({ x: 0, y: 0 });

describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
  beforeAll(connectDB); // 全てのitの前
  beforeEach(initField);
  afterEach(dropDB); // それぞれのitの後
  afterAll(disconnectDB); // 全てのitの後

  it('座標をリセットできる。', async () => {
    // 1: Given
    const positions = [{ x: 1, y: 1 }, { x: 2, y: 1 }];

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/ryoko/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    const beforeDeleteField = await FieldModel.find({}, propFilter).lean();
    const { body } = await chai.request(app).delete('/dev/ryoko/block');
    const afterDeleteField = await FieldModel.find({}, propFilter).lean();

    // 3: Then
    expect(lastBody).toHaveLength(positions.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(body).toEqual(expect.arrayContaining([initialBlock()]));

    // 4: Then:db
    expect(beforeDeleteField).toHaveLength(positions.length + 1);
    expect(beforeDeleteField).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(afterDeleteField).toEqual(expect.arrayContaining([initialBlock()]));
  });

  it('同じ座標にはpostしても登録されない', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/ryoko/block');

    // 1: Given
    const positions = [{ x: 1, y: 1 }, { x: 1, y: 1 }];

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/ryoko/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    // 3: Then
    // 重複削除

    const beforeDeleteField = await FieldModel.find({}, propFilter).lean();
    const positions2 = await positions.filter(
      (v1, i1, a1) => a1.findIndex((v2) => v1.x === v2.x && v1.y === v2.y) === i1,
    );

    expect(lastBody).toHaveLength(positions2.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));

    // 4: Then:db
    expect(beforeDeleteField).toHaveLength(positions2.length + 1);
    expect(beforeDeleteField).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));
  });

  it('周囲の八方向のみ開ける', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/ryoko/block');

    // 1: Given
    // prettier-ignore
    const positions = array2Positions([
      5,0,0,0,3,
      0,0,0,0,0,
      2,0,0,0,0,
      1,0,4,0,0,
      0,0,0,0,6,
    ]);

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/ryoko/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    // 3: Then
    // 開いている場所の周囲八方向のみ登録
    const matchers = await [{ x: 0, y: 1 }, { x: 0, y: 2 }];
    const afterDeleteField = await FieldModel.find({}, propFilter).lean();

    expect(lastBody).toHaveLength(matchers.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));

    // 4: Then:db
    expect(afterDeleteField).toHaveLength(matchers.length + 1);
    expect(afterDeleteField).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));
  });
});
