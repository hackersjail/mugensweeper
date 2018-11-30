const chai = require('chai');
const app = require('../../../../routes/app.js');

describe('field APIのテスト', () => {
  it('最初のfieldを取得する', async () => {
    // Given

    // When
    const { body } = await chai.request(app).get('/dev/matsuda/field');

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({
      x: 0,
      y: 0,
    });
  });
});
