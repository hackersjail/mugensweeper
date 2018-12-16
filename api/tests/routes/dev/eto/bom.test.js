const bomMap = require('../../../../models/dev/eto/bomMap.js');

// prettier-ignore
const directions =[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

describe('爆弾マップのテスト', () => {
  it('原点の周囲の爆弾マップが帰ってくる', () => {
    // GIVEN
    const position = { x: 0, y: 0 };
    const bomCount = Math.ceil(Math.random() * 3);

    // WHEN
    const map = bomMap.initSet(bomCount, position);

    // THEN
    const mapMatcher = directions.map(([x, y]) => ({ x, y }));
    const bomReturn = map.filter(({ bom }) => bom).length;
    expect(map).toHaveLength(8);
    expect(map.map(({ x, y }) => ({ x, y }))).toEqual(expect.arrayContaining(mapMatcher));
    expect(bomReturn).toBe(bomCount);
  });
});
