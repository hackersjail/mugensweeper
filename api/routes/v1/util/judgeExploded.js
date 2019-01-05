module.exports = (field, bom) => {
  // const field1 = [...field];
  const bom1 = bom;
  for (let i = 0; i < bom.length; i += 1) {
    const exploded = field.x === bom1[i].x && field.y === bom1[i].y;
    const field1 = { ...field, exploded };

    if (exploded) {
      return field1;
    }
    return field1;
  }
  return { x: bom.x, y: bom.y };
};
