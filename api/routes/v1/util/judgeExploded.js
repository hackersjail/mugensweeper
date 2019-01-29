module.exports = (block, bombMap) => !!bombMap.find((b) => b.x === block.x && b.y === block.y);
