const chai = require('chai');
const app = require('../../../../routes/app.js');

const initialBlock = () => ({ x: 0, y: 0 });

describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
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
    const { body } = await chai.request(app).delete('/dev/ryoko/block');

    // 3: Then
    expect(lastBody).toHaveLength(positions.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(body).toEqual(expect.arrayContaining([initialBlock()]));
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
    const positions2 = positions.filter(
      (v1, i1, a1) => a1.findIndex((v2) => v1.x === v2.x && v1.y === v2.y) === i1,
    );

    expect(lastBody).toHaveLength(positions2.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));
  });

  it('周囲の八方向のみ開ける', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/ryoko/block');

    // 1: Given
    const positions = [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 4, y: 4 }];

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
    const matchers = [{ x: 0, y: 1 }, { x: 0, y: 2 }];

    expect(lastBody).toHaveLength(matchers.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));
  });
});
