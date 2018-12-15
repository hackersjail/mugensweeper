const chai = require('chai');
const app = require('../../../../routes/app.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const FieldModel = require('../../../../models/dev/rennie/FieldModel.js');
const { initField } = require('../../../../models/dev/rennie/fieldStore.js');

const propFilter = '-_id -__v';

const initialBlock = () => ({ x: 0, y: 0 });

// integration test

describe('field apiについてのテスト', () => {
  beforeAll(connectDB);
  beforeEach(initField);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('初期状態のfieldを取得する', async () => {
    // Given ないこともあ

    // When
    const { body } = await chai.request(app).get('/dev/rennie/field');
    const afterField = await FieldModel.find({}, propFilter).lean();

    // Then
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject(initialBlock());

    // then2
    expect(afterField).toHaveLength(1);
    expect(afterField[0]).toMatchObject(initialBlock());
  });
});

describe('field apiについてのテスト', () => {
  beforeAll(connectDB);
  beforeEach(initField);
  afterEach(dropDB);
  afterAll(disconnectDB);
  it('postした座標が返り値に追加される', async () => {
    // Given
    const position = {
      x: 1,
      y: 0,
    };

    // When
    const { body } = await chai
      .request(app)
      .post('/dev/rennie/block')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(position);

    const afterField = await FieldModel.find({}, propFilter).lean();

    // Then
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([initialBlock(), position]));

    // Then2
    expect(afterField).toHaveLength(2);
    expect(afterField).toEqual(expect.arrayContaining([initialBlock(), position]));
  });
});
