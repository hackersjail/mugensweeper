const chai = require('chai');
const app = require('../../../../routes/app.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const MiyamotoFieldModel = require('../../../../models/dev/miyamoto/FieldModel.js');
const { initField } = require('../../../../models/dev/miyamoto/fieldStore.js');

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
    const { body } = await chai.request(app).get('/dev/miyamoto/field');
    const initialField = await MiyamotoFieldModel.find({}, propFilter).lean();

    // Then: Response
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject(initialBlock());

    // Then: DB
    expect(initialField).toHaveLength(1);
    expect(initialField[0]).toMatchObject(initialBlock());
  });
});
