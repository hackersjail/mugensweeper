const chai = require('chai');
const app = require('../../../../routes/app.js');
const array2Positions = require('./utils/array2Positions.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const MiyamotoFieldModel = require('../../../../models/dev/miyamoto/FieldModel.js');
const { initField } = require('../../../../models/dev/miyamoto/fieldStore.js');
const { getUser } = require('../../../../models/dev/miyamoto/userStore.js');

const propFilter = '-_id -__v';

const initialBlock = () => ({
  x: 0,
  y: 0,
});

describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
  beforeAll(connectDB);
  beforeEach(initField);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('座標をリセットできる。', async () => {
    // Given
    const { token } = (await getUser())[0];
    const positions = [
      {
        x: 1,
        y: 1,
      },
      {
        x: -1,
        y: -1,
      },
    ];

    // When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/miyamoto/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', token)
        .send(positions[i]);
      lastBody = body;
    }

    const beforeDeleteField = await MiyamotoFieldModel.find({}, propFilter).lean();
    const { body } = await chai
      .request(app)
      .delete('/dev/miyamoto/block')
      .set('Authorization', token);
    const afterDeleteField = await MiyamotoFieldModel.find({}, propFilter).lean();

    // Then:response
    expect(lastBody).toHaveLength(positions.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(body).toEqual(expect.arrayContaining([initialBlock()]));

    // Then:db
    expect(beforeDeleteField).toHaveLength(positions.length + 1);
    expect(beforeDeleteField).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(afterDeleteField).toEqual(expect.arrayContaining([initialBlock()]));
  });

  it('同じ座標にはpostしても登録されない', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/miyamoto/block');

    // 1: Given
    const { token } = (await getUser())[0];
    const positions = [{ x: 1, y: 1 }, { x: 1, y: 1 }];

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/miyamoto/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', token)
        .send(positions[i]);
      lastBody = body;
    }
    const afterField = await MiyamotoFieldModel.find({}, propFilter).lean();

    // 3: Then
    // 重複削除
    const positions2 = positions.filter(
      (v1, i1, a1) => a1.findIndex((v2) => v1.x === v2.x && v1.y === v2.y) === i1,
    );

    // Response
    expect(lastBody).toHaveLength(positions2.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));

    // DB
    expect(afterField).toHaveLength(positions2.length + 1);
    expect(afterField).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));
  });

  it('周囲の八方向のみ開ける', async () => {
    // 前のテストのBlockをサーバーから消しておく
    const { token } = (await getUser())[0];
    await chai.request(app).delete('/dev/miyamoto/block');

    // 1: Given
    // prettier-ignore
    const positions = array2Positions([
      5,0,0,0,3,
      0,0,0,0,0,
      2,0,0,0,0,
      1,0,0,0,0,
      0,0,0,0,4,
    ]);

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/miyamoto/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', token)
        .send(positions[i]);
      lastBody = body;
    }
    const afterField = await MiyamotoFieldModel.find({}, propFilter).lean();

    // 3: Then
    // 開いている場所の周囲八方向のみ登録
    const matchers = [{ x: 0, y: 1 }, { x: 0, y: 2 }];

    // Response
    expect(lastBody).toHaveLength(matchers.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));

    // DB
    expect(afterField).toHaveLength(matchers.length + 1);
    expect(afterField).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));
  });
});
