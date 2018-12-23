const chai = require('chai');
const array2Positions = require('./utils/array2Positions.js');
const app = require('../../../../routes/app.js');

const initialBlock = () => ({ x: 0, y: 0 });

describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
  it('周囲8方向を開くことができる', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/rennie/block');
    // Given
    // prettier-ignore
    const positions = array2Positions([
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      4, 0, 0, 0, 0,
      0, 1, 2, 0, 3
    ])

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

    expect(lastBody).toHaveLength(matchers.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));
  });
});
