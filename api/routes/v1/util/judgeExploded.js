module.exports = (block, bomb) => {
  const match = bomb.find((bombBlock) => bombBlock.x === block.x && bombBlock.y === block.y);
  return { ...block, exploded: match !== undefined };
};
