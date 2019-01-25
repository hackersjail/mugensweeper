const jwt = require('jsonwebtoken');
const config = require('./config');

// Access Token (JWT) の生成
module.exports = (userId) =>
  jwt.sign({ userId }, config.SECRET_KEY, {
    expiresIn: '5y',
    audience: config.AUDIENCE,
    issuer: config.ISSURE,
    noTimestamp: true,
  });
