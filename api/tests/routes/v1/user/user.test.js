const chai = require('chai');
const app = require('../../../../routes/app.js');

describe('ユーザー情報を返せるかどうか', () => {
  it('任意で複数ユーザー名をpostして、ユーザーIDつきでリーターンできるか', async () => {
    // Given
    const userName = ['yui', 'taro'];
    // When
    for (let i = 0; i < userName.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/v1/user')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ userName: userName[i] });
      // then
      expect(body[i]).toHaveProperty('userID');
      expect(body[i]).toHaveProperty('userName');
      expect(body[i].userName).toBe(userName[i]);
    }
  });
});
