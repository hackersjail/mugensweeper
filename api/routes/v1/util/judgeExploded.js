module.exports = (field, bom) => {
  for (let i = 0; i < bom.length; i += 1) {
    const exploded = field.x === bom[i].x && field.y === bom[i].y;
    return { ...field, exploded };
  }
  return { x: bom.x, y: bom.y };
};
