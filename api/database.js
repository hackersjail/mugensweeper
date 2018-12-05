const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { NODE_ENV, MONGO_URI } = require('./config.js');

let isConnection = false;
let mongod;
let uri;
let options;

module.exports = {
  async connectDB() {
    if (isConnection) return;

    if (NODE_ENV !== 'test') {
      uri = MONGO_URI;
      options = { useNewUrlParser: true };
    } else if (NODE_ENV === 'test') {
      mongod = new MongoMemoryServer();
      uri = await mongod.getConnectionString();
      options = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      };
    }

    mongoose.connection.once('open', () => {
      // eslint-disable-next-line no-console
      if (NODE_ENV === 'development') console.log(`MongoDB connected`);
      isConnection = true;
    });

    mongoose.connection.on('error', (err) => {
      throw new Error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('close', () => {
      // eslint-disable-next-line no-console
      if (NODE_ENV === 'development') console.log(`MongoDB disconnected`);
      isConnection = false;
    });

    // prettier-ignore
    await mongoose.connect(uri, options);
  },
  async disconnectDB() {
    if (!isConnection) return;
    await mongoose.disconnect();
    if (mongod) await mongod.stop();
  },
  async dropDB() {
    if (!isConnection) return;
    await mongoose.connection.dropDatabase();
  },
};
