module.exports = {
  initSet(bomCount) {
    const array = [];
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

      array.push({ x, y, bom: !!bomPosition.includes(index) });
    });

    return array;
  },
};
