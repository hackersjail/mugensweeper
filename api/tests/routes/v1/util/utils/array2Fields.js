module.exports = (array) => {
  const sqrt = Math.sqrt(array.length);
  return array
    .map((num, i) => num && { num, i })
    .filter((a) => a !== 0)
    .sort((a, b) => a.num - b.num)
    .map(({ i }) => ({
      x: (i % sqrt) - (sqrt + 1) / 2 + 1,
      y: -(Math.floor(i / sqrt) - (sqrt + 1) / 2 + 1) || 0,
    }));
};
