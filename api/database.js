const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
const { NODE_ENV, MONGO_URI, MONGO_URI_TEST } = require('./config.js');

let isConnection = false;
let mongod;
let connection;

module.exports = {
  async connectDB() {
    if (isConnection) return;
    isConnection = true;

    if (NODE_ENV !== 'test') {
      connection = mongoose.connect(
        MONGO_URI,
        { useNewUrlParser: true },
      );
    } else if (NODE_ENV === 'test') {
      // mongod = new MongoMemoryServer();
      // connection = mongoose.connect(
      //   await mongod.getConnectionString(),
      //   {
      //     useNewUrlParser: true,
      //     autoReconnect: true,
      //     reconnectTries: Number.MAX_VALUE,
      //     reconnectInterval: 1000,
      //   },
      // );
      connection = mongoose.connect(
        MONGO_URI_TEST,
        {
          useNewUrlParser: true,
          autoReconnect: true,
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 1000,
        },
      );
    }

    mongoose.connection.on('error', (err) => {
      throw new Error(`MongoDB connection error: ${err}`);
    });
    await connection;
  },
  async disconnectDB() {
    if (!isConnection) return;
    isConnection = false;

    await mongoose.disconnect();
    if (mongod) await mongod.stop();
  },
  async dropDB() {
    if (!isConnection) return;

    await mongoose.connection.dropDatabase();
  },
};
