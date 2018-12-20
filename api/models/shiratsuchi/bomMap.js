module.exports = {
  initSet(bomCount) {
    const arr = [];
    const bomPosition = [];
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

    while (bomPosition.length < bomCount) {
      const num = Math.floor(Math.random() * directions.length);

      if (bomPosition.indexOf(num) === -1) {
        bomPosition.push(num);
      }
    }

    directions.forEach((value, index) => {
      const x = value[0];
      const y = value[1];

      arr.push({
        x,
        y,
        bom:bomPosition.includes(index) ? true : false
      });
    });

    return arr;
  },
};
