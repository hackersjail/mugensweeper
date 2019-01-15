const jwt = require('jsonwebtoken');
const getHash = require('random-hash');
const config = require('./config');

// 宮本環境専用のuserId生成
function genHash() {
  let tempHash = '';
  while (!(tempHash.indexOf('-') === -1 && tempHash.indexOf('_') === -1)) {
    tempHash = getHash.generateHash({ length: 6 });
  }
  return tempHash;
}

// Access Token (JWT) の生成
function generateAccessToken() {
  jwt.sign({ userId: genHash() }, config.get('authentication.token.secret'), {
    expiresIn: '5y',
    audience: config.get('authentication.token.audience'),
    issuer: config.get('authentication.token.issuer'),
    noTimestamp: true,
  });
}

module.exports = generateAccessToken;
