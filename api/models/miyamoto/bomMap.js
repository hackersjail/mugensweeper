const initSet = function(bomCount, position) {
  const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
  let flag = true;
  let cnt = 0;
  const positions = [];
  const tmp = [];
  let tmpX;
  let tmpY;

  while (tmp.length < bomCount) {
    const value = Math.floor(Math.random() * 8);
    flag = true;
    for (let i = 0; i < tmp.length; i += 1) {
      if (tmp[i] === value) flag = false;
    }
    if (flag) tmp.push(value);
  }

  const tmp2 = tmp.sort((a, b) => a - b);

  for (let i = 0; i < directions.length; i += 1) {
    tmpX = position.x - directions[i][0];
    tmpY = position.y - directions[i][1];

    if (tmp2[cnt] === i && cnt < bomCount) {
      positions.push({ x: tmpX, y: tmpY, bom: 1 });
      cnt += 1;
    } else {
      positions.push({ x: tmpX, y: tmpY, bom: 0 });
    }
  }

  return positions;
};

module.exports = {
  initSet,
};
