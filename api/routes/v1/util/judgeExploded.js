module.exports = (block, bom) => {
  const match = bom.find((bomBlock) => bomBlock.x === block.x && bomBlock.y === block.y);

  const a = match !== undefined ? { ...block, exploded: true } : { ...block, exploded: false };
  return a;
};
