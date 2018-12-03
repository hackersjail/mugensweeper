const fsPromises = require('fs').promises;
const { resolve } = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

const globalConfigPath = resolve(__dirname, 'globalConfig.json');
const mongod = new MongoMemoryServer({
  autoStart: false,
});

module.exports = async () => {
  console.log(11);
  if (!mongod.isRunning) {
    console.log(12);
    await mongod.start();
  }

  console.log(13);
  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getConnectionString(),
  };

  console.log(14);
  await fsPromises.writeFile(globalConfigPath, JSON.stringify(mongoConfig));
  global.__MONGOD__ = mongod;
  // process.env.MONGO_URL = mongoConfig.mongoUri;
};
