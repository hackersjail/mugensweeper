const array2fieldHistory = require('./array2fieldHistory.js');
const judgeAddBom = require('../../../../routes/v1/util/judgeExploded.js');

const t = Math.round(new Date().getTime() / 1000);

describe('ブロックを開くとき', () => {
  it('得点に関するテスト', () => {
    // Given
    // prettier-ignore
    const clickedField = array2fieldHistory([

      0, 0, { t, u: 1, f: 2 }, 0, 0,
      0, 0, { t, u: 1, f: 1 }, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ]);

    // prettier-ignore
    const bomMap = array2fieldHistory([
      0, 0, 0, 0, 0,
      0, 0, 1, 2, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ]);

    const matcher = [{ x: 0, y: 1, exploded: true }, { x: 0, y: 2, exploded: false }];

    // Explodedのテスト
    // When
    const results = [];
    for (let i = 0; i < clickedField.length; i += 1) {
      const exploded = judgeAddBom(clickedField[i], bomMap);
      results.push(exploded);
    }
    // then
    expect(results).toEqual(matcher);
  });
});
