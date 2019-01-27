const chai = require('chai');
const app = require('../../../../routes/app.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const array2fieldHistory = require('./array2fieldHistory.js');
const array2bomMap = require('./array2bombMap.js');
const { initData } = require('../../../../models/v1/fieldStore.js');
const { initUser } = require('../../../../models/v1/userStore.js');
const { initBomb } = require('../../../../models/v1/bombStore.js');
const FieldHistoryModel = require('../../../../models/v1/FieldHistoryModel.js');
const BombHistoryModel = require('../../../../models/v1/BombHistoryModel.js');
const UserModel = require('../../../../models/v1/UserModel.js');

const ZERO00000 = 0;
const FIRST_ONE = 'u0:0:op';
const propFilter = '-_id -__v';
const time = Math.round(new Date().getTime() / 1000);

describe('ブロックを開くとき', () => {
  beforeAll(connectDB);
  beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('得点に関するテスト', async () => {
    // Given
    // prettier-ignore
    // param means 'u2:5:op' → userid:2, order:5, action:opened
    // action pattern → op:opened, **unset(sf:setFlag, df deleteFlag)
    const fieldHistory = array2fieldHistory([
      ZERO00000,ZERO00000,ZERO00000,ZERO00000,ZERO00000,ZERO00000,ZERO00000,
      ZERO00000,ZERO00000, ZERO00000, ZERO00000, 'u2:5:op', 'u1:4:op',ZERO00000,
      ZERO00000,'u3:12:op', 'u5:7:op', ZERO00000, 'u3:3:op', ZERO00000,ZERO00000,
      ZERO00000,'u6:11:op', 'u5:10:op', FIRST_ONE, 'u4:6:op', 'u5:9:op',ZERO00000,
      ZERO00000,'u3:13:op', ZERO00000, 'u2:1:op', 'u4:8:op', ZERO00000,ZERO00000,
      ZERO00000,ZERO00000, 'u1:2:op', ZERO00000, ZERO00000, ZERO00000,ZERO00000,
      ZERO00000,ZERO00000,'u7:14:op',ZERO00000,ZERO00000,ZERO00000,ZERO00000,
    ], time);
    // prettier-ignore
    const bombHistory = array2bomMap([
      0, 0, 0, 0, 0, 0, 0,
      0, 7, 5, 4, 0, 0, 0,
      12, 0, 0, 0, 3, 0, 0,
      11, 0, 0, 0, 6, 0, 0,
      13, 0, 10, 0, 8, 9, 0,
      0, 1, 2, 0, 0, 0, 0,
      0, 14, 0, 0, 0, 0, 0,
    ], time);
    const userinfo = [
      { userName: 'Nanako', userId: 1 },
      { userName: 'Taro', userId: 2 },
      { userName: 'Ken', userId: 3 },
      { userName: 'Jiro', userId: 4 },
      { userName: 'Momoko', userId: 5 },
      { userName: 'Sayaka', userId: 6 },
      { userName: 'Yuki', userId: 7 },
    ];
    // const currentUser = { userName: 'Nanako', userId: 1 };
    const matcher = [
      { points: 3, userId: '5', userName: 'Momoko' },
      { points: 2, userId: '3', userName: 'Ken' },
      { points: 2, userId: '2', userName: 'Taro' },
      { points: 1, userId: '1', userName: 'Nanako' },
      { points: 1, userId: '6', userName: 'Sayaka' },
      { points: 1, userId: '7', userName: 'Yuki' },
    ];

    await BombHistoryModel.insertMany(bombHistory);
    await FieldHistoryModel.insertMany(fieldHistory);
    await UserModel.insertMany(userinfo);
    await BombHistoryModel.find({}, propFilter).lean();
    await FieldHistoryModel.find({}, propFilter).lean();
    await initBomb();
    await initData();
    await initUser();

    // const data = getData();
    // console.log(data);

    const { body } = await chai
      .request(app)
      .get('/v1/point')
      .set('content-type', 'application/x-www-form-urlencoded');

    // const { currentUserInfo } = await chai
    //   .request(app)
    //   .get('/v1/point')
    //   .set('content-type', 'application/x-www-form-urlencoded')
    //   // .set('Authorization', token) // headerにテスト用tokenセット
    //   .send(currentUser);

    expect(body).toEqual(matcher);
  });
});
