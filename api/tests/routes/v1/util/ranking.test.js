const chai = require('chai');
const app = require('../../../../routes/app.js');
// const array2fieldHistory = require('./array2fieldHistory.js');
const { initData, getData, addData, saveData } = require('../../../../models/v1/fieldStore.js');
// const FieldHistoryModel = require('../../../../models/v1/FieldHistoryModel.js');
// const {
//   createNewfieldWithBomMap,
//   calculatePointsForPlayer,
//   generateRanking,
// } = require('../../../../models/v1/pointStore.js');
const ranking = require('../../../../routes/v1/point/ranking.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

// const t = Math.round(new Date().getTime() / 1000);

describe('ブロックを開くとき', () => {
  beforeAll(connectDB);
  beforeEach(initData);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('得点に関するテスト', async () => {
    // Given
    // prettier-ignore
    // const fieldinfo = array2fieldHistory([
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, { t, u: 1, f: 7 }, { t, u: 3, f: 8 }, { t, u: 4, f: 13 }, 0,
    //   0, 0, 0, 0, { t, u: 2, f: 2 }, { t, u: 1, f: 6 }, 0, { t, u: 3, f: 9 }, 0,
    //   0, 0, 0, 0, { t, u: 1, f: 1 }, { t, u: 2, f: 5 }, { t, u: 2, f: 4 }, { t, u: 4, f: 10 }, { t, u: 5, f: 12 },
    //   0, 0, 0, 0, 0, { t, u: 1, f: 3 }, { t, u: 1, f: 11 }, 0, { t, u: 1, f: 14 },
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    // ]);
    const fieldinfo1 = [{x:1,y:1,userId:1,actionId:1},{x:1,y:2,userId:2,actionId:2},{x:1,y:3,userId:1,actionId:3}];
    // const fieldinfo = [
    //   { x: 2, y: 1, userId: 1, actionId: 4 },
    //   { x: 2, y: 2, userId: 2, actionId: 5 },
    //   { x: 2, y: 3, userId: 1, actionId: 6 },
    // ];
    // const fieldinfo = [{x:1,y:1},{x:1,y:2},{x:1,y:3}];

    // // prettier-ignore
    // const bomMap = array2fieldHistory([
    //   0, 0, 0, 0, 0, { f: 7 }, 0, { f: 8 }, { f: 13 },
    //   0, 0, 0, 0, { f: 2 }, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, { f: 1 }, 0, { f: 4 }, { f: 12 },
    //   0, 0, 0, 0, 0, { f: 3 }, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, { f: 10 }, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    // ]);

    // const clicked = [
    //   { userId: 1, points: 3 },
    //   { userId: 4, points: 2 },
    //   { userId: 5, points: 1 },
    //   { userId: 2, points: 0 },
    //   { userId: 3, points: 0 },
    // ];

    // const rankingMatcher = [
    //   { userId: 1, points: 3 },
    //   { userId: 4, points: 2 },
    //   { userId: 5, points: 1 },
    //   { userId: 2, points: 0 },
    //   { userId: 3, points: 0 },
    // ];
    // const beforePostField = await FieldHistoryModel.insertMany(fieldinfo1);

    const data = getData();

    let lastBody;
    for (let i = 0; i < fieldinfo1.length; i += 1) {
      const { field } = fieldinfo1[i];
      const { body } = await chai
        .request(app)
        .post('/v1/field')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ field });
      lastBody = body;
    }
    addData(lastBody);
    await saveData();
    // const data = getData();

    expect(ranking).toEqual(data);

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
