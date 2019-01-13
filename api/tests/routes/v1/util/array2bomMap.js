module.exports = (array) => {
  const size = Math.sqrt(array.length);
  return array
    .map((p, idx) =>
      p !== 0
        ? {
            x: Math.floor(idx % size) - Math.floor(size / 2),
            y: Math.floor(size / 2) - Math.floor(idx / size),
            actionId: p,
          }
        : p,
    )
    .filter((p) => p !== 0);
};
