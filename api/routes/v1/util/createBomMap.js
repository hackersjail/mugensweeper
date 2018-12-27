module.exports = {
  createBomMap(arr) {
    const newBomMap = [];
    for (let i = 0; i < arr.length; i += 1) {
      const block = [arr[i].x, arr[i].y];
      newBomMap.push(block);
    }
    return newBomMap;
  },
};
