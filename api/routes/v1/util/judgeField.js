module.exports = (add, field) => {
  const around = field.filter((d) => Math.abs(d.x - add.x) <= 1 && Math.abs(d.y - add.y) <= 1);
  return around.length ? !around.find((f) => f.x === +add.x && f.y === +add.y) : false;
};
