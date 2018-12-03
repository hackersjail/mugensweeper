module.exports = async () => {
  console.log(31);
  await global.__MONGOD__.stop();
};
