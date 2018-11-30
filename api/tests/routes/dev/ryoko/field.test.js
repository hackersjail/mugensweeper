const chai = require('chai');
const app = require('../../../../routes/app.js');

describe('field app についてのテスト', () => {
  it('初期状態のfieldを取得する', async () => {
    // Given
    // const given = 'mugensweeper';//前提条件

    // When
    const { body } = await chai.request(app).get(`/dev/ryoko/field`);

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({ x: 0, y: 0 });
  });
});
