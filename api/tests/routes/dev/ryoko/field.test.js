const chai = require('chai');
const app = require('../../../../routes/app.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const RyokoFieldModel = require('../../../../models/dev/ryoko/FieldModel.js');
const { initField } = require('../../../../models/dev/ryoko/fieldStore.js');

const propFilter = '-_id -__v';

const initialBlock = () => ({ x: 0, y: 0 });

describe('field app についてのテスト', () => {
  beforeAll(connectDB); // 全てのitの前
  beforeEach(initField);
  afterEach(dropDB); // それぞれのitの後
  afterAll(disconnectDB); // 全てのitの後

  it('初期状態のfieldを取得する', async () => {
    // Given
    // const given = 'mugensweeper';//前提条件

    // When
    const { body } = await chai.request(app).get(`/dev/ryoko/field`);
    const initialField = await RyokoFieldModel.find({}, propFilter).lean();

    // 3: Then
    // Response
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject(initialBlock());
    // DB
    expect(initialField).toHaveLength(1);
    expect(initialField[0]).toMatchObject(initialBlock());
  });
});
