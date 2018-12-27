module.exports = (arr) => {
  const newBomMap = [];
  for (let i = 0; i < arr.length; i += 1) {
    const block = { x: arr[i].x, y: arr[i].y };
    newBomMap.push(block);
  }
  return newBomMap;
};
