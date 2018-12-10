const chai = require('chai');
const app = require('../../../../routes/app.js');
// const field = require('../../../../routes/dev/mishima/field');

const initialBlock = () => ({
  x: 0,
  y: 0,
});

describe('field-APIについてテストする', () => {
  it('初期状態の盤面を取得する', async () => {
    // Given
    // const given = 'mugensweeper';

    // When
    const { body } = await chai.request(app).get('/dev/mishima/field');

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
      .post('/dev/mishima/block')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(position);
    // Then
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([initialBlock(), position]));
  });
});
