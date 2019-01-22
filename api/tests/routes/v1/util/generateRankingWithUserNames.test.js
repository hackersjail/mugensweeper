const array2fieldHistory = require('./array2fieldHistory.js');
const array2bombMap = require('./array2bombMap.js');
const judgeExploded = require('../../../../routes/v1/util/judgeExploded.js');
const generateRaningWithUserNames = require('../../../../routes/v1/util/generateRankingWithUserNames.js');

const ZERO00000 = 0;
const time = Math.round(Date.now() / 1000);

describe('ブロックを開くとき', () => {
  it('得点に関するテスト', () => {
    // Given
    // prettier-ignore
    // param means 'u2:5:op' → userid:2, order:5, action:opened
    // action pattern → op:opened, **unset(sf:setFlag, df deleteFlag)
    const fieldHistory = array2fieldHistory([
      ZERO00000, ZERO00000, ZERO00000, 'u2:5:op', 'u1:4:op',
      ZERO00000, ZERO00000, ZERO00000, 'u3:3:op', ZERO00000,
      ZERO00000, ZERO00000, ZERO00000 , ZERO00000, ZERO00000,
      ZERO00000, ZERO00000, 'u2:1:op', ZERO00000, ZERO00000,
      ZERO00000, 'u1:2:op', ZERO00000, ZERO00000, ZERO00000,
    ], time);

    // prettier-ignore
    // param means 'u2:5:op' → userid:2, order:5, action:opened
    // action pattern → op:opened, **unset(sf:setFlag, df deleteFlag)
    const bombHistory = array2bombMap([
      0, 0, 5, 4, 0,
      0, 0, 0, 0, 3,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 1, 2, 0, 0,
    ], time);

    const userinfo = [
      { userName: 'Nanako', userId: 1 },
      { userName: 'Taro', userId: 2 },
      { userName: 'Ken', userId: 3 },
    ];

    const matcher = [
      { points: 1, userId: 3, userName: 'Ken' },
      { points: 1, userId: 1, userName: 'Nanako' },
      { points: 0, userId: 2, userName: 'Taro' },
    ];

    const fieldWithExplodedData = [];
    for (let i = 0; i < fieldHistory.length; i += 1) {
      fieldWithExplodedData.push(judgeExploded(fieldHistory[i], bombHistory));
    }
    const ranking = generateRaningWithUserNames(fieldWithExplodedData, userinfo);

    expect(ranking).toEqual(expect.objectContaining(matcher));
  });
});
