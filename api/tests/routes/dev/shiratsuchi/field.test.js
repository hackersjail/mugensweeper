const chai = require('chai');
const app = require('../../../../routes/app.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const ShiratsuchiFieldModel = require('../../../../models/dev/shiratsuchi/fieldModel.js');
const { initField } = require('../../../../models/dev/shiratsuchi/fieidstore.js');

const propFilter = '-_id -__v';

const initialBlock = () => ({
  x: 0,
  y: 0,
});

describe('field APIについてのテスト', () => {
  beforeAll(connectDB);
  beforeEach(initField);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('最初のfield情報を取得する', async () => {
    // Given

    // When
    const { body } = await chai.request(app).get('/dev/shiratsuchi/field');
    const DBgetField = await ShiratsuchiFieldModel.find({}, propFilter).lean();
    // Then response
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject(initialBlock());
    // Then db
    expect(DBgetField).toHaveLength(1);
    expect(DBgetField[0]).toMatchObject(initialBlock());
  });

  it('postした座標が返り値に追加される', async () => {
    // Given
    const position = {
      x: 1,
      y: 0,
    };
    // When
    const { body } = await chai
      .request(app)
      .post('/dev/shiratsuchi/block')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(position);
    // Then
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([initialBlock(), position]));
  });
});
