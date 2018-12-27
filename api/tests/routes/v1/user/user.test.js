const chai = require('chai');
const app = require('../../../../routes/app.js');

describe('ユーザー情報を返せるかどうか', () => {
  it('任意で複数ユーザー名をpostして、ユーザーIDつきでリーターンできるか', async () => {
    // Given
    const nameList = [{ userName: 'yuika' }, { userName: 'taro' }];
    // When
    for (let i = 0; i < nameList.length; i += 1) {
      const { userName } = nameList[i];
      const { body } = await chai
        .request(app)
        .post('/v1/user')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ userName });
      // then
      expect(body[i]).toHaveProperty('userId');
      expect(body[i].userName).toBe(userName);
    }
  });
  it('ユーザー名の文字数(3~7文字)、文字種(半角文字のみ入力可)制限', async () => {
    // 1: Given
    const nameList = [
      { userName: 'ss', judge: false },
      { userName: 'tttt', judge: true },
      { userName: 'jjjjjjjjjjjj', judge: false },
      { userName: 'あいうえ', judge: false },
    ];

    // 2: When
    const results = [];
    for (let i = 0; i < nameList.length; i += 1) {
      const { userName } = nameList[i];
      const { status } = await chai
        .request(app)
        .post('/v1/user')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ userName });
      results.push(status);
    }

    // 3: Then
    results.forEach((r, i) => {
      expect(r).toBe(nameList[i].judge ? 200 : 401);
    });
  });
});
