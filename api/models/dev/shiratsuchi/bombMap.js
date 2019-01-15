module.exports = {
  initSet(bombCount) {
    const array = [];
    const bombPosition = [];
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

    while (bombPosition.length < bombCount) {
      const num = Math.floor(Math.random() * directions.length);

      if (bombPosition.indexOf(num) === -1) {
        bombPosition.push(num);
      }
    }

    directions.forEach((value, index) => {
      const x = value[0];
      const y = value[1];

      array.push({
        x,
        y,
        bomb: bombPosition.includes(index) ? 1 : 0,
      });
    });

    return array;
  },
};
