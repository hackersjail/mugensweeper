module.exports = (array) => {
  const maxNumber = Math.max.apply(null, array);
  const size = Math.sqrt(array.length);
  const returnArray = [];

  for (let i = 1; i <= maxNumber; i += 1) {
    const x = array.indexOf(i) % size;
    const y = size - Math.floor(array.indexOf(i) / size) - 1;
    returnArray.push({ x, y });
  }

  return returnArray;
};
