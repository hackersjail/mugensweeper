// const chai = require('chai');
// const app = require('../../../../routes/app.js');
// const array2fieldHistory = require('./array2fieldHistory.js');
// const { initData, getData, addData, saveData } = require('../../../../models/v1/fieldStore.js');
// const { initUser, getUser, addUser, saveUser } = require('../../../../models/v1/userStore.js');
// const FieldHistoryModel = require('../../../../models/v1/FieldHistoryModel.js');
// const UserModel = require('../../../../models/v1/UserModel.js');
// // const {
// //   createNewfieldWithBomMap,
// //   calculatePointsForPlayer,
// //   generateRanking,
// // } = require('../../../../models/v1/pointStore.js');
// // const ranking = require('../../../../routes/v1/point/ranking.js');
// const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');

// // const t = Math.round(new Date().getTime() / 1000);

// describe('ブロックを開くとき', () => {
//   beforeAll(connectDB);
//   // beforeEach(initData);
//   afterEach(dropDB);
//   afterAll(disconnectDB);
//   it('得点に関するテスト', async () => {
//     // Given

//     const fieldinfo1 = [
//       { x: 1, y: 1, userId: 1, actionId: 1 },
//       { x: 1, y: 2, userId: 2, actionId: 2 },
//       { x: 1, y: 3, userId: 1, actionId: 3 },
//     ];
//     const userinfo = [{ userName: 'Nanako', userId: 1 }, { userName: 'Taro', userId: 2 }];
//     await FieldHistoryModel.insertMany(fieldinfo1);
//     await UserModel.insertMany(userinfo);
//     await initData();
//     await initUser();

//     // console.log(a);

//     // const data = getData();
//     // console.log(data);

//     let lastBody;
//     for (let i = 0; i < fieldinfo1.length; i += 1) {
//       const { field } = fieldinfo1[i];
//       const { body } = await chai
//         .request(app)
//         .post('/v1/ranking')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send({ field });
//       lastBody = body;
//     }
//     console.log(lastBody);

//     const data = getData();

//     expect(ranking).toEqual(data);

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
//   });
// });
