const chai = require('chai');
const app = require('../../../../routes/app.js');
const { getUser } = require('../../../../models/dev/miyamoto/userStore.js');

describe('userIdとそれにヒモ付くjwt(JSON Web Token)関連のテスト', () => {
  it('ユーザー名を基に、userIdとそれにヒモ付くtoken(jwt)生成', async () => {
    // Given
    const testers = [{ userName: 'tester1' }, { userName: 'tester2' }];
    const preTester = await getUser();

    // When
    const lastBody = [];
    for (let i = 0; i < testers.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/user_id_generate')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(testers[i]);
      lastBody.push(body);
    }

    // Then
    expect(lastBody.length).toEqual(testers.length);
    expect(await getUser()).toEqual(
      expect.arrayContaining(
        preTester,
        { userName: 'tester1', userId: expect.anything(), token: expect.anything() },
        { userName: 'tester2', userId: expect.anything(), token: expect.anything() },
      ),
    );
  });
});
