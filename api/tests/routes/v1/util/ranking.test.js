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

const token =
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJleGFtcGxlMCIsImV4cCI6MTcwNTc0MjM4OSwiYXVkIjoibXVnZW5zd2VlcGVycyIsImlzcyI6Im11Z2Vuc3dlZXBlcnMifQ.ISinmaTZDcOzHM4q4MALgmnSA7x6wN9pa1wkRGvlRWw';

const ZERO00000 = 0;
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
      ZERO00000,  ZERO00000,  ZERO00000,  ZERO00000,  ZERO00000,  ZERO00000,  ZERO00000,
      'u3:19:op', ZERO00000,  ZERO00000,  ZERO00000,  'u2:5:op',  'u1:4:op',  ZERO00000,
      ZERO00000,  'u3:12:op', 'u5:7:op',  ZERO00000,  'u3:3:op',  ZERO00000,  ZERO00000,
      ZERO00000,  'u6:11:op', 'u5:10:op', ZERO00000,  'u4:6:op',  'u5:9:op',  ZERO00000,
      ZERO00000,  'u3:13:op', ZERO00000,  'u2:1:op',  'u4:8:op',  ZERO00000,  ZERO00000,
      ZERO00000,  ZERO00000,  'u1:2:op',  ZERO00000,  ZERO00000,  ZERO00000,  ZERO00000,
      'u8:19:op', ZERO00000,  'u7:14:op', 'u8:15:op', 'u1:16:op', 'u7:17:op', 'u6:18:op',
    ], time);
    // prettier-ignore
    const bombHistory = array2bomMap([
      0, 0, 0, 0, 0, 0, 0,
      0, 7, 5, 4, 0, 0, 0,
      12, 0, 0, 0, 3, 0, 0,
      11, 0, 0, 0, 6, 0, 0,
      13, 0, 10, 0, 8, 9, 0,
      0, 1, 2, 16, 15, 7, 0,
      0, 14, 0, 0, 0, 0, 0,
    ], time);
    const userinfo = [
      { userName: 'Nanako', userId: 'example0' },
      { userName: 'Taro', userId: 'example1' },
      { userName: 'Ken', userId: 'example2' },
      { userName: 'Jiro', userId: 'example3' },
      { userName: 'Momoko', userId: 'example4' },
      { userName: 'Sayaka', userId: 'example5' },
      { userName: 'Yuki', userId: 'example6' },
      { userName: 'Yuka', userId: 'example7' },
      { userName: 'Taka', userId: 'example8' },
    ];

    const matcher = {
      myData: { points: 0, userName: 'tester', ranking: 8 },
      highScores: [
        { points: 3, userName: 'Jiro', ranking: 1 },
        { points: 2, userName: 'Sayaka', ranking: 2 },
        { points: 2, userName: 'Yuka', ranking: 2 },
        { points: 2, userName: 'Yuki', ranking: 2 },
        { points: 1, userName: 'Ken', ranking: 5 },
        { points: 1, userName: 'Taka', ranking: 5 },
        { points: 1, userName: 'Taro', ranking: 5 },
      ],
    };

    await BombHistoryModel.insertMany(bombHistory);
    await FieldHistoryModel.insertMany(fieldHistory);
    await UserModel.insertMany(userinfo);
    await initBomb();
    await initData();
    await initUser();

    const ranking = (await chai
      .request(app)
      .get('/v1/point')
      .set('Authorization', token)).body; // headerにテスト用tokenセット

    expect(ranking).toEqual(matcher);
  });
});
