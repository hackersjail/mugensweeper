const chai = require('chai');
const app = require('../../../../routes/app.js');

describe('field APIについてのテスト', () => {
  it('最初のfield情報を取得する', async () => {
    // Given

    // When
    const { body } = await chai.request(app).get('/dev/miyamoto/field');

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({ x: 0, y: 0 });
  });
});
