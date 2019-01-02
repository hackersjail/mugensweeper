const { bomMap } = require('../../../../routes/v1/util/CreateBoms.js');
const array2Fields = require('./utils/array2Fields.js');
const array2Machers = require('./utils/array2Machers.js');

describe('BomMapを生成する', () => {
  it('与えた座標の周囲の余剰にBomMapが返ってくる', () => {
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
      const result = bomMap(rate, field, positions[i]);
      results.push([...result]);
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
      expect(machers[t]).toContainEqual(...results[t]);
    }
  });
});
