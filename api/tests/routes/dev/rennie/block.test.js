const chai = require('chai');
const app = require('../../../../routes/app.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const FieldModel = require('../../../../models/dev/rennie/FieldModel.js');
const { initField } = require('../../../../models/dev/rennie/fieldStore.js');

const propFilter = '-_id -__v';

const initialBlock = () => ({ x: 0, y: 0 });

// describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
//   beforeAll(connectDB);
//   beforeEach(initField);
//   afterEach(dropDB);
//   afterAll(disconnectDB);
//   it('座標をリセットできる。', async () => {
//     // Given
//     const positions = [{ x: 1, y: 2 }, { x: 3, y: 1 }];
//     // When
//     let lastBody;
//     for (let i = 0; i < positions.length; i += 1) {
//       const { body } = await chai
//         .request(app)
//         .post('/dev/rennie/block')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send(positions[i]);
//       lastBody = body;
//     }

//     const beforeDeleteField = await FieldModel.find({}, propFilter).lean();
//     const { body } = await chai.request(app).delete('/dev/rennie/block');
//     const afterDeleteField = await FieldModel.find({}, propFilter).lean();

//     // Then
//     expect(lastBody).toHaveLength(positions.length + 1);
//     expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
//     expect(body).toEqual(expect.arrayContaining([initialBlock()]));

//     // 4. Then:db
//     expect(beforeDeleteField).toHaveLength(positions.length + 1);
//     expect(beforeDeleteField).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
//     expect(afterDeleteField).toEqual(expect.arrayContaining([initialBlock()]));
//   });
// });

// describe('field apiについてのテスト', () => {
//   beforeAll(connectDB);
//   beforeEach(initField);
//   afterEach(dropDB);
//   afterAll(disconnectDB);

//   it('同じ座標にはpostしても登録されない', async () => {
//     // 前のテストのBlockをサーバーから消しておく
//     await chai.request(app).delete('/dev/rennie/block');
//     // Given
//     const positions = [{ x: 1, y: 0 }, { x: 1, y: 0 }];
//     // When
//     let lastBody;
//     for (let i = 0; i < positions.length; i += 1) {
//       const { body } = await chai
//         .request(app)
//         .post('/dev/rennie/block')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send(positions[i]);
//       lastBody = body;
//     }

//     // const beforeDeleteField = await FieldModel.find({}, propFilter).lean();
//     const { body } = await chai.request(app).post('/dev/rennie/block');
//     const afterField = await FieldModel.find({}, propFilter).lean();
//     console.log(body);

//     // Then
//     // 重複削除
//     const positions2 = positions.filter(
//       (v1, i1, a1) => a1.findIndex((v2) => v1.x === v2.x && v1.y === v2.y) === i1,
//     );
//     expect(lastBody).toHaveLength(positions2.length + 1);
//     expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));

//     // Then2
//       expect(afterField).toHaveLength(positions2.length + 1);
//       expect(afterField).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
//       // expect(afterDeleteField).toEqual(expect.arrayContaining([initialBlock()]));
//   });
// });

describe('field apiについてのテスト', () => {
  beforeAll(connectDB);
  beforeEach(initField);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('周囲8方向を開くことができる', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/rennie/block');
    // Given
    const positions = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }, { x: 0, y: 1 }];
    // When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/rennie/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }
    // Then
    // 8方向にいく

    const matchers = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }];
    const afterField = await FieldModel.find({}, propFilter).lean();

    expect(lastBody).toHaveLength(matchers.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));

    // Then2
    expect(afterField).toHaveLength(matchers.length + 1);
    expect(afterField).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));
  });
});
