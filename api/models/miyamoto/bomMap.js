const initSet = function(bomCount, position) {
  const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
  let counter = 0;
  const positions = [];
  let tmpX;
  let tmpY;

  for (let i = 0; i < directions.length; i += 1) {
    tmpX = position.x - directions[i][0];
    tmpY = position.y - directions[i][1];
    if (bomCount - counter >= directions.length - i) {
      positions.push({ x: tmpX, y: tmpY, bom: 1 });
      counter += 1;
    } else if (Math.floor(Math.random() * 10) % 3 === 0) {
      if (counter < bomCount) {
        positions.push({ x: tmpX, y: tmpY, bom: 1 });
        counter += 1;
      } else {
        positions.push({ x: tmpX, y: tmpY, bom: 0 });
      }
    } else {
      positions.push({ x: tmpX, y: tmpY, bom: 0 });
    }
  }
  return positions;
};

module.exports = {
  initSet,
};
