const jwt = require('jsonwebtoken');
const config = require('./config');

// Access Token (JWT) の生成
function generateAccessToken(userId) {
  return jwt.sign({ userId }, config.authentication.token.secret.key, {
    expiresIn: '5y',
    audience: config.authentication.token.audience.default,
    issuer: config.authentication.token.issuer.default,
    noTimestamp: true,
  });
}

module.exports = generateAccessToken;
