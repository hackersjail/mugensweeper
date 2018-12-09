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
});
