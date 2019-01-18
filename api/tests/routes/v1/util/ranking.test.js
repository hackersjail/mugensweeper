// const chai = require('chai');
// const app = require('../../../../routes/app.js');
// const array2fieldHistory = require('./array2fieldHistory.js');
// const { initData, getData, addData, saveData } = require('../../../../models/v1/fieldStore.js');
// const { initUser, getUser, addUser, saveUser } = require('../../../../models/v1/userStore.js');
// const FieldHistoryModel = require('../../../../models/v1/FieldHistoryModel.js');
// const UserModel = require('../../../../models/v1/UserModel.js');
// const array2bomMap = require('./array2bomMap.js');

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
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

// const t = Math.round(new Date().getTime() / 1000);

describe('ブロックを開くとき', () => {
  beforeAll(connectDB);
  // beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('得点に関するテスト', async () => {
    // Given
    // prettier-ignore
    // param means 'u2:5:op' → userid:2, order:5, action:opened
    // action pattern → op:opened, **unset(sf:setFlag, df deleteFlag)
    // const fieldHistory = array2fieldHistory([
    //   ZERO00000, ZERO00000, ZERO00000, 'u2:5:op', 'u1:4:op',
    //   ZERO00000, ZERO00000, ZERO00000, 'u3:3:op', ZERO00000,
    //   ZERO00000, ZERO00000, FIRST_ONE, ZERO00000, ZERO00000,
    //   ZERO00000, ZERO00000, 'u2:1:op', ZERO00000, ZERO00000,
    //   ZERO00000, 'u1:2:op', ZERO00000, ZERO00000, ZERO00000,
    // ], time);

    // // prettier-ignore
    // // param means 'u2:5:op' → userid:2, order:5, action:opened
    // // action pattern → op:opened, **unset(sf:setFlag, df deleteFlag)
    // const bomHistory = array2bomMap([
    //   ZERO00000, ZERO00000, '5', '4',ZERO00000,
    //   ZERO00000, ZERO00000, ZERO00000, ZERO00000,'3',
    //   ZERO00000, ZERO00000, FIRST_ONE, ZERO00000, ZERO00000,
    //   ZERO00000, ZERO00000, ZERO00000, ZERO00000,ZERO00000,
    //   ZERO00000, '1', '2', ZERO00000,ZERO00000,,
    // ], time);

    // const fieldinfo1 = [
    //   { x: 1, y: 1, userId: 1, actionId: 1 },
    //   { x: 1, y: 2, userId: 2, actionId: 2 },
    //   { x: 1, y: 3, userId: 1, actionId: 3 },
    // ];
    // const userinfo = [
    //   { userName: 'Nanako', userId: 1 },
    //   { userName: 'Taro', userId: 2 },
    //   { userName: 'Ken', userId: 3 },
    // ];
    // await FieldHistoryModel.insertMany(fieldHistory);
    // await UserModel.insertMany(userinfo);
    // await FieldHistoryModel.find({}, propFilter).lean();
    // await initData();
    // await initUser();

    // // console.log(a);

    // const data = getData();
    // console.log(data);

    // let lastBody;
    // for (let i = 0; i < fieldinfo1.length; i += 1) {
    //   const { field } = fieldinfo1[i];
    //   const { body } = await chai
    //     .request(app)
    //     .post('/v1/ranking')
    //     .set('content-type', 'application/x-www-form-urlencoded')
    //     .send({ field });
    //   lastBody = body;
    // }
    // console.log(lastBody);

    // const data = getData();

    // expect(ranking).toEqual(data);

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
