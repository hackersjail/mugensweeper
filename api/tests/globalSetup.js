const fsPromises = require('fs').promises;
const { resolve } = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

const globalConfigPath = resolve(__dirname, 'globalConfig.json');
const mongod = new MongoMemoryServer({
  autoStart: false,
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getConnectionString(),
  };

  await fsPromises.writeFile(globalConfigPath, JSON.stringify(mongoConfig));
  global.__MONGOD__ = mongod;
  // process.env.MONGO_URL = mongoConfig.mongoUri;
};
