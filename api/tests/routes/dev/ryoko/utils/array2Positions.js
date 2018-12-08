module.exports = (array) => {
  // const positions = [];
  const sqrt = Math.sqrt(array.length);

  return array
    .map((num, i) => num && { num, i })
    .filter((a) => a !== 0)
    .sort((a, b) => a.num - b.num)
    .map(({ i }) => ({ x: i % sqrt, y: sqrt - 1 - Math.floor(i / sqrt) }));

  // array.map((num, i) => {
  //   if (num > 0) {
  //     positions.push({ x: i % sqrt, y: sqrt - 1 - Math.floor(i / sqrt), order: num });
  //   }
  // });
  // // prettier-ignore
  // return positions
  // .sort((a, b) => a.order - b.order)
  // .map(({ x, y }) => ({ x, y }));
};
