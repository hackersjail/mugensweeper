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
        .post('/dev/mishima/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }
    let { body } = await chai.request(app).delete('/dev/mishima/block'); // eslint-disable-line

    // Then
    expect(lastBody).toHaveLength(positions.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(body).toEqual(expect.arrayContaining([initialBlock()]));
  });

  it('ランダムに複数Postした座標が返り値に追加される', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/mishima/block');

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
        .post('/dev/mishima/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    // Then
    expect(lastBody).toHaveLength(count + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
  });
});
