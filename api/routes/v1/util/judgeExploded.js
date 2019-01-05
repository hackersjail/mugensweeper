module.exports = (field, bom) => {
  for (let i = 0; i < bom.length; i += 1) {
    if (bom[i].x === field.x && bom[i].y === field.y) {
      return { x: field.x, y: field.y, exploded: true };
    }
    return { x: field.x, y: field.y, exploded: false };
  }
  return { x: bom.x, y: bom.y };
};
