module.exports = (array) => {
  const sqrt = Math.sqrt(array.length);
  const machers = [];
  for (let n = 1; n <= 3; n += 1) {
    const macher = array
      .map((num, i) => num && { num, i })
      .filter(({ num }) => num === n)
      .map(({ i }) => ({
        x: (i % sqrt) - (sqrt + 1) / 2 + 1,
        y: -(Math.floor(i / sqrt) - (sqrt + 1) / 2 + 1) || 0,
      }));
    machers.push(macher);
  }
  return machers;
};
