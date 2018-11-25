const chai = require('chai');
const app = require('../../../../routes/app.js');

// describe('field APIについてのテスト', () => {
//   it('最初のfield情報を取得する', async () => {
//     // Given

//     // When
//     const { body } = await chai.request(app).get('/dev/miyamoto/field');

//     // Then
//     expect(body).toHaveLength(1);
//     expect(body[0]).toMatchObject({ x: 0, y: 0 });
//   });
// });

describe('reset関数についてのテスト', () => {
  it('x=0,y=0のみが開いた最初のfield情報を取得する', async () => {
    // Given

    // When
    const { body } = await chai.request(app).get('/dev/miyamoto/field/reset');

    // Then
    expect(body).toHaveLength(3);
    expect(body[0][0]).toMatchObject({ x: -1, y: -1, opened: false });
    expect(body[0][1]).toMatchObject({ x: 0, y: -1, opened: false });
    expect(body[0][2]).toMatchObject({ x: 1, y: -1, opened: false });
    expect(body[1][0]).toMatchObject({ x: -1, y: 0, opened: false });
    expect(body[1][1]).toMatchObject({ x: 0, y: 0, opened: true });
    expect(body[1][2]).toMatchObject({ x: 1, y: 0, opened: false });
    expect(body[2][0]).toMatchObject({ x: -1, y: 1, opened: false });
    expect(body[2][1]).toMatchObject({ x: 0, y: 1, opened: false });
    expect(body[2][2]).toMatchObject({ x: 1, y: 1, opened: false });
  });

  it('reset関数実行後、x=0,y=0へのgetリクエストがオープンのため何も起きない事を確認する。', async () => {
    // Given

    // When
    await chai.request(app).get('/dev/miyamoto/field/reset');

    const { body } = await chai
      .request(app)
      .get('/dev/miyamoto/field')
      .query({ x: 0, y: 0 });

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({ x: 0, y: 0, opened: true });
  });
});
