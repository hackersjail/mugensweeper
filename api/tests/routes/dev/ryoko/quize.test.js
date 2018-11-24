const quize = require('../../../../routes/dev/ryoko/quize');

describe('Jest example', () => {
  it('a', () => {
    expect(quize(3)).toBe(31);
  });

  it('b', () => {
    expect(quize(5)).toBe(79);
  });

  it('c', () => {
    expect(quize(8)).toBe(196);
  });
});
