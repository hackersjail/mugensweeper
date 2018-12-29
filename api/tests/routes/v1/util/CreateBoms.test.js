const { bomMap } = require('../../../../routes/v1/util/CreateBoms.js');
const array2Fields = require('./utils/array2Fields.js');
// const array2Machers = require('./utils/array2Machers.js');

const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

describe('BomMapを生成する', () => {
  it('与えた座標の周囲の余剰にBomMapが返ってくる', () => {
    // await chai.request(app).delete('/dev/ryoko/block');    // 前のテストのBlockをサーバーから消しておく

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
    // console.log(field);
    const positions = [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: -2, y: 1 }];

    // prettier-ignore
    // const machers = array2Machers([
    //   0, 0, 0, 0, 2, 2, 2, 0, 0,
    //   0, 0, 0, 0, 1, 1, 1, 0, 0,
    //   0, 3, 0, 0, 0, 0, 1, 0, 0,
    //   0, 3, 0, 0, 0, 0, 1, 0, 0,
    //   0, 3, 3, 3, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0, 0,
    // ])

    // console.log(machers);

    // 2: When
    const results = [];
    for (let i = 0; i < positions.length; i += 1) {
      const result = bomMap(rate, field, positions[i]);
      results.push(...result);
    }

    // 3: Then

    for (let i = 0; i < positions.length; i += 1) {
      const aroundPositions2 = [];
      const aroundField2 = [];

      // positionsの周囲8マス
      const aroundPositions = directions.map(([x, y]) => ({
        x: x + positions[i].x,
        y: y + positions[i].y,
      }));
      aroundPositions2.push(...aroundPositions);

      // fieldの周囲8マス
      for (let t = 0; t < field.length; t += 1) {
        const aroundField = directions.map(([x, y]) => ({
          x: x + field[t].x,
          y: y + field[t].y,
        }));
        aroundField2.push(...aroundField);
      }

      // Bomが置ける余剰
      const leftBlock = aroundPositions2.filter(
        (data) => !aroundField2.find((d) => d.x === data.x && d.y === data.y),
      );
      // console.log(aroundPositions2);
      // console.log(aroundField2);
      // console.log(leftBlock);

      // console.log(results);

      expect(results.map(({ x, y }) => ({ x, y }))).toMatchObject(
        expect.arrayContaining([...leftBlock]),
      );
    }
  });
});
