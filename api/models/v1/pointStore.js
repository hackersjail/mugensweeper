const judgeExploded = require('../../routes/v1/util/judgeExploded.js');

const generateEachPoint = (fieldInfo) =>
  fieldInfo.reduce((sortedField, block) => {
    let userInfo = [{ userId: block.userId, points: 1 }, ...sortedField];

    if (block.exploded || sortedField.findIndex((a) => a.userId === block.userId) !== -1) {
      userInfo[0].points = block.exploded
        ? 0
        : sortedField.find((a) => a.userId === block.userId).points + 1;
      userInfo = userInfo.filter(
        (v1, i1, a1) => a1.findIndex((v2) => v1.userId === v2.userId) === i1,
      );
    }
    return userInfo;
  }, []);

module.exports = {
  createNewfieldWithBombMap: (fieldHistory, bombMap) =>
    fieldHistory.map((field) => ({ ...field, exploded: judgeExploded(field, bombMap) })),

  calculatePointsForPlayer: (fieldWithBombMap, user) =>
    generateEachPoint(fieldWithBombMap).find((block) => block.userId === user),

  generateEachPoint,
};
