const bomMap = require('../../../../models/rennie/bomMap.js');

const directions = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];

describe('爆弾マップのテスト', () => {
  it('原点の周囲の爆弾マップが返ってくる', () => {
    // Given
    const bomCount = Math.ceil(Math.random() * 3);
    const position = { x: 0, y: 0 };
    // const mapLength = 8;

    // when
    const map = bomMap.initSet(bomCount, position);

    // [{x,y,bom 1|0},...]

    // Then

    // 期待する配列

    const mapMatchers = directions.map(([x, y]) => ({ x, y })); // 原点だからそのまま
    const bomReturn = map.filter(({ bom }) => bom).length;
    expect(map.map(({ x, y }) => ({ x, y }))).toEqual(expect.arrayContaining(mapMatchers));
    expect(bomReturn).toBe(bomCount);
  });
  it('余剰枠を付与して返すテスト', () => {
    // Given
    // prettier-ignore
    // const field =
    // [-5,-3,-5,
    //   -3,4,-3,
    //   -5,-3,-5
    // ]

    // const mapLength = 8;

    // when
    // const positions = [1,2,3];
    // for (let i = 0; i < positions.length; i += 1) {
    //   const { body } = await chai
    //     .request(app)
    //     .post('/dev/rennie/block')
    //     .set('content-type', 'application/x-www-form-urlencoded')
    //     .send(positions[i]);
    //   lastBody = body;
    // }

    // [{x,y,bom 1|0},...]

    // Then

    // 期待する配列

    //   const mapMatchers = directions.map(([x, y]) => ({ x, y })); // 原点だからそのまま
    //   const bomReturn = map.filter(({ bom }) => bom).length;
    //   expect(map.map(({ x, y }) => ({ x, y }))).toEqual(expect.arrayContaining(mapMatchers));
    //   expect(bomReturn).toBe(bomCount);
  });
});
