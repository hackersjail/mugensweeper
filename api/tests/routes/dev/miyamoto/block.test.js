const chai = require('chai');
const app = require('../../../../routes/app.js');

const initialBlock = () => ({
  x: 0,
  y: 0,
});

describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
  it('座標をリセットできる。', async () => {
    // Given
    const positions = [
      {
        x: 1,
        y: 2,
      },
      {
        x: 3,
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
        .send(positions[i]);
      lastBody = body;
    }
    let { body } = await chai.request(app).delete('/dev/miyamoto/block'); // eslint-disable-line

    // Then
    expect(lastBody).toHaveLength(positions.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(body).toEqual(expect.arrayContaining([initialBlock()]));
  });

  it('ランダムに複数Postした座標が返り値に追加される', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/miyamoto/block');

    // Given
    const positions = [];
    const count = Math.floor(5 * Math.random()) + 5;
    let cnt = 0;
    while (cnt < count) {
      const tmp = {
        // eslint-disable-line
        x: Math.floor(10000 * Math.random()),
        y: Math.floor(10000 * Math.random()),
      };

      if (positions.indexOf(tmp) === -1) {
        positions.push(tmp);
        cnt += 1;
      }
    }

    // When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/miyamoto/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    // Then
    expect(lastBody).toHaveLength(count + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
  });

  it('同じ座標にはpostしても登録されない', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/miyamoto/block');

    // 1: Given
    const positions = [{ x: 1, y: 1 }, { x: 1, y: 1 }];

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/miyamoto/block')
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
});
