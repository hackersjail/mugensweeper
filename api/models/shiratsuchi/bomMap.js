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
      const id = bomPosition.indexOf(index);
      const x = value[0];
      const y = value[1];

      if (id >= 0) {
        arr.push({ x, y, bom: true });
      } else {
        arr.push({ x, y, bom: false });
      }
    });

    return arr;
  },
};
