const directions = require('../../../util/directions.js')();

module.exports = (add, field) => {
  const JudgeDupli = field.find((d) => d.x === +add.x && d.y === +add.y);
  const JudgeAroundadjacent = field.find((d) =>
    directions.find((data) => d.x === data[0] + +add.x && d.y === data[1] + +add.y),
  );

  return !JudgeDupli && JudgeAroundadjacent;
};
