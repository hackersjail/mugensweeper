const judgeExploded = require('../../routes/v1/util/judgeExploded.js');

const eachPoints = (fieldInfo) =>
  fieldInfo.reduce((sortedField, block) => {
    let users = [{ userId: block.userId, points: 1 }, ...sortedField];
    if (block.exploded || sortedField.findIndex((a) => a.userId === block.userId) !== -1) {
      users[0].points = block.exploded
        ? 0
        : sortedField.find((a) => a.userId === block.userId).points + 1;
      users = users.filter((v1, i1, a1) => a1.findIndex((v2) => v1.userId === v2.userId) === i1);
    }
    return users;
  }, []);

module.exports = {
  createNewfieldWithBomMap: (fieldHistory, bomMap) =>
    fieldHistory.map((field) => judgeExploded(field, bomMap)),

  calculatePointsForPlayer: (fieldWithBomMap, user) =>
    eachPoints(fieldWithBomMap).find((block) => block.userId === user),

  generateRanking: (fieldWithBomMap) =>
    eachPoints(fieldWithBomMap).sort((a, b) => b.points - a.points || a.userId - b.userId),
};
