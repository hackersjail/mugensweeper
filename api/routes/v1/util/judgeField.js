module.exports = (add, field) => {
  const len = field.filter((d) => Math.abs(d.x - add.x) <= 1 && Math.abs(d.y - add.y) <= 1);
  return len.length ? !len.find((f) => f.x === +add.x && f.y === +add.y) : false;
};
