const eachPoints = (fieldInfo) =>
  fieldInfo.reduce((sortedField, block) => {
    const currentBlock = sortedField.find((a) => a.userId === block.userId);
    const currentIndex = sortedField.findIndex((a) => a.userId === block.userId);
    if (block.bom === true) {
      sortedField.splice(currentIndex, 1, {
        userId: block.userId,
        points: 0,
      });
    } else if (sortedField.findIndex((a) => a.userId === block.userId) !== -1) {
      sortedField.splice(currentIndex, 1, {
        userId: block.userId,
        points: currentBlock.points + 1,
      });
    } else {
      sortedField.push({ userId: block.userId, points: 1 });
    }
    return sortedField;
  }, []);

module.exports = {
  createNewfieldWithBomMap(fieldInfo, bomMap) {
    const field = fieldInfo;
    for (let i = 0; i < field.length; i += 1) {
      for (let m = 0; m < bomMap.length; m += 1) {
        if (
          field[i].x === bomMap[m].x &&
          field[i].y === bomMap[m].y &&
          field[i].actionId > bomMap[m].actionId
        ) {
          field[i] = {
            x: field[i].x,
            y: field[i].y,
            userId: field[i].userId,
            actoinId: field[i].actionId,
            bom: true,
          };
        }
      }
    }
    return field;
  },
  calculatePointsForPlayer(fieldInfo, user) {
    const eachPoint = eachPoints(fieldInfo);
    const result = eachPoint.filter((block) => block.userId === user.userId);
    return result;
  },
  generateRanking(fieldInfo) {
    const eachPoint = eachPoints(fieldInfo);
    const result = eachPoint.sort((a, b) => b.points - a.points);
    return result;
  },
};
