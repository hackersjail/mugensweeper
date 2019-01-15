module.exports = (array, time) => {
  const size = Math.sqrt(array.length);
  return array
    .map((p, idx) =>
      p !== 0
        ? {
            x: Math.floor(idx % size) - Math.floor(size / 2),
            y: Math.floor(size / 2) - Math.floor(idx / size),
            userId: +p.split(':')[0].replace('u', ''),
            action: p.split(':')[2] === 'op' ? 'opened' : 'none',
            recordtime: time,
            actionId: +p.split(':')[1],
          }
        : p,
    )
    .filter((p) => p !== 0)
    .sort((a, b) => a.actionId - b.actionId);
};
