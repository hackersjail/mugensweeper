const chai = require('chai');
const app = require('../../../../routes/app.js');

describe('Example of Jest using Express', () => {
  it('Evaluate the requested query', async () => {
    // Given
    // const given = 'mugensweeper';

    console.log('aaa');
    // When
    const { body } = await chai.request(app).get(`/dev/hiro/field`);

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({ x: 0, y: 0 });

    // expect(res.text).toMatch(/grapefruit/).toBe(given);
  });
});
