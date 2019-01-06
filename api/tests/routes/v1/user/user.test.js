const chai = require('chai');
const app = require('../../../../routes/app.js');
const {
  initData,
  getData,
  addData,
  saveData,
  deleteData,
} = require('../../../../models/v1/userStore.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

describe('ユーザー情報を返せるかどうか', () => {
  beforeAll(connectDB);
  beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('任意で複数ユーザー名をpostして、ユーザーIDつきでリーターンできるか', async () => {
    // Given
    const nameList = [{ userName: 'yuika' }, { userName: 'taro' }];

    // Response

    // When
    for (let i = 0; i < nameList.length; i += 1) {
      const { userName } = nameList[i];
      await chai
        .request(app)
        .post('/v1/user')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ userName });
      const { body } = await chai.request(app).get('/v1/user');

      // then
      expect(body[i]).toHaveProperty('userId');
      expect(body[i].userName).toBe(userName);
    }

    // DB

    // When
    await initData();
    addData(nameList[0].userName);
    await saveData();
    const afterSaveUser = getData();
    await deleteData();

    // then
    expect(afterSaveUser[0]).toHaveProperty('userId');
    expect(afterSaveUser[0].userName).toBe(nameList[0].userName);
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
