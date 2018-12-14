module.exports = (array) => {
  const tmp = [];
  const positions = [];
  const square = Math.sqrt(array.length);
  const lastInitialBlock = array.length - square;

  for (let i = 0; i < array.length; i += 1) {
    if (array[i] !== 0) tmp.push({ idx: i, value: array[i] });
  }

  const tmp2 = tmp.sort((a, b) => a.value - b.value);

  for (let s = 0; s < tmp.length; s += 1) {
    positions.push({
      x: tmp2[s].idx % square,
      y: lastInitialBlock / square - Math.floor(tmp2[s].idx / square),
    });
  }
  return positions;
};
