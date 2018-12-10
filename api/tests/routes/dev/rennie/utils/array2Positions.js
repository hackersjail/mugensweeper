module.exports = (array) => {
  const { length } = array;
  const xlength = Math.sqrt(length);
  const temp = [];

  for (let i = 0; i < array.length; i + 1) {
    if (Number(array[i]) > 0) {
      const index = Number(array[i]);
      const number = array.indexOf(index) + 1;

      if (number <= xlength) {
        if (Number(array.indexOf(index)) === 0) {
          const x = 0;
          const y = xlength - 1;
          temp.push({ x, y });
        } else {
          const x = number - 1;
          const y = xlength - 1;
          temp.push({ x, y });
        }
      } else if (number === array.length) {
        const x = xlength - 1;
        const y = 0;
        temp.push({ x, y });
      } else {
        const x = (number % xlength) - 1;
        const y = xlength - (Math.floor(number / xlength) + 1);
        temp.push({ x, y });
      }
    }
  }
  const temp1 = temp.reverse();
  // console.log('temp', temp1);

  return temp1;
};

// 奇数の正方形であることという規約をつける math.square. とかつける
