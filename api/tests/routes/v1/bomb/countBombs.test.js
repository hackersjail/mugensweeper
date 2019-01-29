const countBombs = require('../../../../routes/v1/bomb/countBombs.js');
const array2Fields = require('../util/array2Fields.js');

describe('Bombの数を数える', () => {
  it('与えた座標の周囲のBombの数が返ってくる', () => {
    // 1: Given

    // prettier-ignore
    const bombMap = array2Fields([
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 1, 1, 1,
      0, 0, 0, 0, 0,
    ]);

    const positions = [{ x: 1, y: 0 }, { x: -1, y: -1 }, { x: -1, y: 1 }];

    // 2: When

    const results = [];
    for (let i = 0; i < positions.length; i += 1) {
      const result = countBombs(bombMap, positions[i]);
      results.push(result);
    }

    // 3: Then
    const machers = [5, 2, 3];

    for (let t = 0; t < positions.length; t += 1) {
      expect(machers[t]).toEqual(results[t]);
    }
  });
});
