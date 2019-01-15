const directions = require('../../../util/directions.js')();

module.exports = (add, field) => {
  let flag1 = true;
  let flag2 = false;
  field.forEach((d) => {
    if (d.x === +add.x && d.y === +add.y) flag1 = false;
    if (directions.find((data) => d.x === data[0] + +add.x && d.y === data[1] + +add.y))
      flag2 = true;
  });
  return flag1 && flag2;
};
