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
  it('ユーザー名の文字数(3~7文字)、文字種(*,/,￥,＆,")制限', async () => {
    // 1: Given
    const nameList = [
      { name: 'ss', judge: false },
      { name: 'tttt', judge: true },
      { name: 'jjjjjjjjjjjj', judge: false },
      { name: '#$%w', judge: false },
    ];

    // 2: When
    const results = [];
    for (let i = 0; i < nameList.length; i += 1) {
      const { name } = nameList[i];
      const { status } = await chai
        .request(app)
        .post('/v1/user_name')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name });
      results.push(status);
    }

    // 3: Then
    results.forEach((r, i) => {
      expect(r).toBe(nameList[i].judge ? 200 : 401);
    });
  });
});
