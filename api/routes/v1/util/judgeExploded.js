module.exports = (block, bom) => {
  const match = bom.find((bomBlock) => bomBlock.x === block.x && bomBlock.y === block.y);
  const exploded = match !== undefined;
  return { ...block, exploded };
};
