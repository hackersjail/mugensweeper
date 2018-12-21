module.exports = (array) => {
  const maxNumber = Math.max(...array);
  const size = Math.sqrt(array.length);
  const reArray = [];

  for (let i = 1; i <= maxNumber; i += 1) {
    const x = array.indexOf(i) % size;
    const y = size - Math.floor(array.indexOf(i) / size) - 1;
    reArray.push({ x, y });
  }

  return reArray;
};
