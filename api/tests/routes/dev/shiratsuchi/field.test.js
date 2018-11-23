const chai = require('chai');
const app = require('../../../../routes/app.js');


describe('field apiテスト', () => {
  it('最初filedを取得する', async () => {
    // Given
    // const given = 'mugensweeper';

    // When
    const { body } = await chai.request(app).get('/dev/shiratsuchi/field');

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({x:0,y:0});


  });
});
