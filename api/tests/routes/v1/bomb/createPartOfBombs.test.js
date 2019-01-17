const createPartOfBombs = require('../../../../routes/v1/bomb/createPartOfBombs.js');
const array2Fields = require('../util/array2Fields.js');
const array2Machers = require('../util/array2Machers.js');

describe('BombMapを生成する', () => {
  it('与えた座標の周囲の余剰にBombMapが返ってくる', () => {
    // 1: Given

    const rate = 0.7;
    // prettier-ignore
    const field = array2Fields([
      0, 4, 0, 0, 0,
      0, 0, 2, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 3, 0, 0,
      0, 0, 0, 0, 0,
    ]);
    const positions = [{ x: 1, y: 2 }, { x: 1, y: -2 }, { x: -2, y: 1 }];

    // 2: When

    const results = [];
    for (let i = 0; i < positions.length; i += 1) {
      const result = createPartOfBombs(rate, field, positions[i]);
      results.push(result);
    }

    // 3: Then

    // prettier-ignore
    const machers = array2Machers([
      0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 0, 0,
      0, 3, 0, 0, 0, 0, 1, 0, 0,
      0, 3, 0, 0, 0, 0, 1, 0, 0,
      0, 3, 3, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 2, 0, 0,
      0, 0, 0, 0, 0, 0, 2, 0, 0,
      0, 0, 0, 0, 2, 2, 2, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])

    for (let t = 0; t < positions.length; t += 1) {
      for (let p = 0; p < results[t].length; p += 1) {
        expect(machers[t]).toContainEqual(results[t][p]);
      }
    }
  });
});
