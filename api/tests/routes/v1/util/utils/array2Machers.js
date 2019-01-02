module.exports = (array) => {
  const sqrt = Math.sqrt(array.length);
  const array3 = [];
  for (let n = 1; n <= 3; n += 1) {
    const array2 = array
      .map((num, i) => num && { num, i })
      .filter(({ num }) => num === n)
      .map(({ i }) => ({
        x: (i % sqrt) - (sqrt + 1) / 2 + 1,
        y: -(Math.floor(i / sqrt) - (sqrt + 1) / 2 + 1) || 0,
      }));
    array3.push(array2);
  }
  return array3;
};
