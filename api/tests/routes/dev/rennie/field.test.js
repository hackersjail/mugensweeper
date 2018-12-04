const chai = require('chai');
const app = require('../../../../routes/app.js');

const initialBlock = () => ({
  x: 0,
  y: 0,
});

// integration test
describe('field apiについてのテスト', () => {
  it('初期状態のfieldを取得する', async () => {
    // Given ないこともあ

    // When
    const { body } = await chai.request(app).get('/dev/rennie/field');

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject(initialBlock());
  });

  it('postした座標が返り値に追加される', async () => {
    // Given
    const position = {
      x: 2,
      y: 4,
    };

    // When
    const { body } = await chai
      .request(app)
      .post('/dev/rennie/block')
      .set('content-type', 'application/x-www-form-urlencoded') // 送るときの形
      .send(position);

    // Then
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([initialBlock(), position]));
  });
});
