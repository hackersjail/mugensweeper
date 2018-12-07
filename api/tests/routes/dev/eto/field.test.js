const chai = require('chai');
const app = require('../../../../routes/app.js');

const initialBlock = () => ({
  x: 0,
  y: 0,
});

describe('fieldAPIのテスト', () => {
  it('初期状態のフィールドを取得する', async () => {
    // Given

    // When
    const { body } = await chai.request(app).get('/dev/eto/field');

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject(initialBlock()); // 影響ない初期値を得るため
  });

  it('POSTした座標が返り値に追加される', async () => {
    // Given
    const position = {
      x: 1,
      y: 3,
    };

    // When
    const { body } = await chai
      .request(app)
      .post('/dev/eto/block')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(position);

    // Then
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([initialBlock(), position]));
  });
});
