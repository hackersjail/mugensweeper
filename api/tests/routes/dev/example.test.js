const chai = require('chai');
const app = require('../../../routes/app.js');
const ExampleModel = require('../../../models/ExampleModel.js');
const { connectDB, disconnectDB, dropDB } = require('../../../database.js');

const propFilter = '-_id -__v';

describe('Jest example', () => {
  const twice = (n) => n * 2;

  it('3 x 2 = 6', () => {
    expect(twice(3)).toBe(6);
  });

  it('10.5 x 2 = 21', () => {
    expect(twice(10.5)).toBe(21);
  });
});

describe('Example of Jest using Express', () => {
  it('Evaluate the requested query', async () => {
    // Given
    const given = 'mugensweeper';

    // When
    const { res } = await chai.request(app).get(`/dev/example?string=${given}`);

    // Then
    expect(res.text).toBe(given);
  });
});

describe('Example of Jest using Mongoose', () => {
  beforeAll(connectDB);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('Evaluate the inserted document', async () => {
    // Given
    const name = 'example';

    // When
    await new ExampleModel({ name }).save();

    // Then
    const result = await ExampleModel.findOne({}, propFilter).lean();
    expect(result.name).toMatch(name);
  });
});
