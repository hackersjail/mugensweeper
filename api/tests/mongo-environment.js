const fsPromises = require('fs').promises;
const { resolve } = require('path');
const NodeEnvironment = require('jest-environment-node');

const globalConfigPath = resolve(__dirname, 'globalConfig.json');

module.exports = class MongoEnvironment extends NodeEnvironment {
  // eslint-disable-next-line no-useless-constructor
  constructor(config) {
    console.log(21);
    super(config);
  }

  async setup() {
    console.log('Setup MongoDB Test Environment');

    const globalConfig = JSON.parse(await fsPromises.readFile(globalConfigPath, 'utf-8'));

    this.global.__MONGO_URI__ = globalConfig.mongoUri;
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName;

    await super.setup();
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment');

    await super.teardown();
  }

  runScript(script) {
    console.log(22);
    return super.runScript(script);
  }
};
