module.exports = {
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: ['<rootDir>/tests', '<rootDir>/config.js', '<rootDir>/database.js'],
  globalSetup: '<rootDir>/tests/globalSetup.js',
  globalTeardown: '<rootDir>/tests/teardown.js',
  setupFiles: ['<rootDir>/tests/setup.js'],
  testEnvironment: '<rootDir>/tests/mongo-environment.js',
};
