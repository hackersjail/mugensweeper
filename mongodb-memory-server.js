const { MongoMemoryServer } = require('mongodb-memory-server');

async function mms() {
  const mongod = new MongoMemoryServer();
  console.log('MMS start');

  const uri = await mongod.getConnectionString();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();

  console.log(`uri: ${uri}\nport: ${port}\ndbPath: ${dbPath}\ndbName: ${dbName}`);

  await new Promise((resolve) => {
    setTimeout(() => {
      mongod.stop();
      resolve();
    }, 5000);
  });
  console.log('MMS stop');
}

mms();
