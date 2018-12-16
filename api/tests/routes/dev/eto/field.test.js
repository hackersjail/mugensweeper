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
    expect(body[0]).toMatchObject(initialBlock());
  });
});
