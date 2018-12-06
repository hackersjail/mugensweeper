const chai = require('chai');
const app = require('../../../../routes/app.js');

const initialBlock = () => ({
  x: 0,
  y: 0,
});

describe('field APIについてのテスト', () => {
  it('最初のfield情報を取得する', async () => {
    // Given

    // When
    const { body } = await chai.request(app).get('/dev/shiratsuchi/field');

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject(initialBlock());
  });

  it('postした座標が返り値に追加される', async () => {
    // Given
    const position = {
      x: 3,
      y: -1,
    };
    // When
    const { body } = await chai
      .request(app)
      .post('/dev/shiratsuchi/block')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(position);
    // Then
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([initialBlock(), position]));
  });
});
