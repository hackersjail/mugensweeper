// const chai = require('chai');
// const app = require('../../../../routes/app.js');
// const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
// const array2fieldHistory = require('./array2fieldHistory.js');
// const array2bomMap = require('./array2bombMap.js');
// const { initData, getData, addData, saveData } = require('../../../../models/v1/fieldStore.js');
// const { initUser, getUser, addUser, saveUser } = require('../../../../models/v1/userStore.js');
// const { initBomb, getBomb, addBomb, saveBomb } = require('../../../../models/v1/bombStore.js');

// const FieldHistoryModel = require('../../../../models/v1/FieldHistoryModel.js');
// const BombHistoryModel = require('../../../../models/v1/BombHistoryModel.js');
// const UserModel = require('../../../../models/v1/UserModel.js');

// const ZERO00000 = 0;
// const FIRST_ONE = 'u0:0:op';
// const propFilter = '-_id -__v';
// const time = Math.round(new Date().getTime() / 1000);

// const {
//   createNewfieldWithBomMap,
//   calculatePointsForPlayer,
//   generateRanking,
// } = require('../../../../models/v1/pointStore.js');
// const ranking = require('../../../../routes/v1/point/ranking.js');

describe('ブロックを開くとき', () => {
  // beforeAll(connectDB);
  // beforeEach(initData);
  // afterEach(dropDB);
  // afterAll(disconnectDB);
  it('得点に関するテスト', async () => {
    // // Given
    // // prettier-ignore
    // // param means 'u2:5:op' → userid:2, order:5, action:opened
    // // action pattern → op:opened, **unset(sf:setFlag, df deleteFlag)
    // const fieldHistory = array2fieldHistory([
    //   ZERO00000, ZERO00000, ZERO00000, 'u2:5:op', 'u1:4:op',
    //   ZERO00000, ZERO00000, ZERO00000, 'u3:3:op', ZERO00000,
    //   ZERO00000, ZERO00000, FIRST_ONE, ZERO00000, ZERO00000,
    //   ZERO00000, ZERO00000, 'u2:1:op', ZERO00000, ZERO00000,
    //   ZERO00000, 'u1:2:op', ZERO00000, ZERO00000, ZERO00000,
    // ], time);
    // // prettier-ignore
    // const bombHistory = array2bomMap([
    //   0, 0, 5, 4, 0,
    //   0, 0, 0, 0, 3,
    //   0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0,
    //   0, 1, 2, 0, 0,
    // ], time);
    // const userinfo = [
    //   { userName: 'Nanako', userId: 1 },
    //   { userName: 'Taro', userId: 2 },
    //   { userName: 'Ken', userId: 3 },
    // ];
    // const matcher = [
    //   { points: 1, userId: '3', userName: 'Ken' },
    //   { points: 0, userId: '1', userName: 'Nanako' },
    //   { points: 0, userId: '2', userName: 'Taro' },
    // ];
    // await FieldHistoryModel.insertMany(fieldHistory);
    // await BombHistoryModel.insertMany(bombHistory);
    // await UserModel.insertMany(userinfo);
    // await FieldHistoryModel.find({}, propFilter).lean();
    // await BombHistoryModel.find({}, propFilter).lean();
    // await initData();
    // await initUser();
    // await initBomb();
    // const data = getData();
    // const userData = getUser();
    // console.log(data);
    // console.log(userData);
    // let lastBody;
    // for (let i = 0; i < data.length; i += 1) {
    //   for (let m = 0; m < userData.length; m += 1) {
    //     console.log(i, m);
    //     const { field } = data[i];
    //     const { user } = userData[m];
    //     const { body } = await chai
    //       .request(app)
    //       .post('/v1/point')
    //       .set('content-type', 'application/x-www-form-urlencoded')
    //       .send({ field }, { user });
    //     lastBody = body;
    //   }
    // }
    // console.log(lastBody);
    // expect(lastBody).toEqual(matcher);
    // // fieldHistoryとbomHistoryを使って爆弾情報を含んだfieldの生成
    // const field2 = createNewfieldWithBomMap(fieldinfo, bomMap);
    // // １人のuserのpointを計算のテスト
    // // when
    // for (let i = 0; i < rankingMatcher.length; i += 1) {
    //   const player = calculatePointsForPlayer(field2, rankingMatcher[i].userId);
    //   // Then
    //   expect(player).toEqual(rankingMatcher[i]);
    // }
    // // Rankingのテスト
    // // When
    // const ranking = generateRanking(field2);
    // // Then
    // expect(ranking).toEqual(rankingMatcher);
    // }
  });
});
