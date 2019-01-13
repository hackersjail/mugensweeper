const eachPoints = (fieldInfo) =>
  fieldInfo.reduce((sortedField, block) => {
    if (block.exploded || sortedField.findIndex((a) => a.userId === block.userId) !== -1) {
      const currentBlock = sortedField.find((a) => a.userId === block.userId);
      const tempField = [
        { userId: block.userId, points: block.exploded ? 0 : currentBlock.points + 1 },
        ...sortedField,
      ];
      return tempField.filter((v1, i1, a1) => a1.findIndex((v2) => v1.userId === v2.userId) === i1);
    }
    return [{ userId: block.userId, points: 1 }, ...sortedField];
  }, []);

module.exports = {
  createNewfieldWithBomMap(fieldInfo, bomMap) {
    const field = [...fieldInfo];
    for (let i = 0; i < field.length; i += 1) {
      for (let m = 0; m < bomMap.length; m += 1) {
        const exploded =
          field[i].x === bomMap[m].x &&
          field[i].y === bomMap[m].y &&
          field[i].actionId > bomMap[m].actionId;
        field[i] = { ...field[i], exploded };
        if (exploded) break;
      }
    }
    return field;
  },
  calculatePointsForPlayer(fieldInfo, user) {
    const eachPoint = eachPoints(fieldInfo);
    const result = eachPoint.find((block) => block.userId === user);
    return result;
  },
  generateRanking(fieldInfo) {
    const eachPoint = eachPoints(fieldInfo);
    return eachPoint.sort((a, b) => b.points - a.points || a.userId - b.userId);
  },
};
