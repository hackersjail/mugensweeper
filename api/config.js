require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 10000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mugensweeper',
};
