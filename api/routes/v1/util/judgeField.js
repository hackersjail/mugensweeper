function judgeField(prefield, add) {
  const posi = {
    x: add.x,
    y: add.y,
  };
  for (let i = 0; i < prefield.length; i += 1) {
    const { x, y } = prefield[i];
    if (posi.x === x && posi.y === y) {
      return false;
    }
  }
  return true;
}
module.exports = judgeField;
