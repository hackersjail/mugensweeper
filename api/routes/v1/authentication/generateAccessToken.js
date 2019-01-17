const jwt = require('jsonwebtoken');
const config = require('./config');

// Access Token (JWT) の生成
function generateAccessToken(userId) {
  return jwt.sign({ userId }, config.get('authentication.token.secret'), {
    expiresIn: '5y',
    audience: config.get('authentication.token.audience'),
    issuer: config.get('authentication.token.issuer'),
    noTimestamp: true,
  });
}

module.exports = generateAccessToken;
