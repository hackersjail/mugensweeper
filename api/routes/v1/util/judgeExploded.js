module.exports = (block, bom) => {
  const match = bom.find((bomBlock) => bomBlock.x === block.x && bomBlock.y === block.y);
  return { ...block, exploded: match !== undefined };
};
