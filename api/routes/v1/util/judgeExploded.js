module.exports = (block, bom) => {
  const match = bom.find((bomBlock) => bomBlock.x === block.x && bomBlock.y === block.y);
  if (match !== undefined) {
    return { ...block, exploded: true };
  }
  return { ...block, exploded: false };
};
