module.exports = (array) => {
  const { length } = array;
  const size = Math.sqrt(length);

  return array
    .map((num, i) => num && { num, i })
    .filter((a) => a !== 0)
    .sort((a, b) => a.num - b.num)
    .map(({ i }) => ({ x: i % size, y: size - Math.floor(i / size) - 1 }));
};
