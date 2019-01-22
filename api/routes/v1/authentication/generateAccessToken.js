const jwt = require('jsonwebtoken');
const config = require('./config');

// Access Token (JWT) の生成
function generateAccessToken(userId) {
  return jwt.sign({ userId }, config.SECRET_KEY, {
    expiresIn: '5y',
    audience: config.AUDIENCE,
    issuer: config.ISSURE,
    noTimestamp: true,
  });
}

module.exports = generateAccessToken;
