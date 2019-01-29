module.exports = {
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: ['<rootDir>/tests', '<rootDir>/config.js', '<rootDir>/database.js'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setup.js'],
};
