describe('Jest example', () => {
  const twice = n => n * 2;

  it('3 x 2 = 6', () => {
    expect(twice(3)).toBe(6);
  });

  it('10.5 x 2 = 21', () => {
    expect(twice(10.5)).toBe(21);
  });
});
