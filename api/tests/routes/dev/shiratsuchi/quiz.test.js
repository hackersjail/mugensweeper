const quiz = require('../../../../routes/dev/shiratsuchi/quiz.js');

describe('Jest example', () => {
  // const twice = (n) => n * 2;

  it('a', () => {
    expect(quiz(3)).toBe(31);
  });

  it('b', () => {
    expect(quiz(5)).toBe(79);
  });

  it('c', () => {
    expect(quiz(8)).toBe(196);
  });
});
