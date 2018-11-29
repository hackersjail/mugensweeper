const chai = require('chai');
const app = require('../../../../routes/app.js');
// const field = require('../../../../routes/dev/mishima/field');

describe('field-APIについてテストする', () => {
  it('初期状態の盤面を取得する', async () => {
    // Given


    // When
    const { body } = await chai.request(app).get('/dev/mishima/field');

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({ x: 0, y: 0 });
  });
});
