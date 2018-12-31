const jwt = require('jsonwebtoken');
const getHash = require('random-hash');
const config = require('./config');

// 宮本環境専用のuserId生成
function genHash() {
  let tempHash = '';
  let flag = 0;
  while (flag === 0) {
    tempHash = getHash.generateHash({ length: 6 });
    if (tempHash.indexOf('-') === -1 && tempHash.indexOf('_') === -1) {
      flag = 1;
    }
  }
  return tempHash;
}

// Access Token (JWT) の生成
function generateAccessToken() {
  const expiresIn = '5y';
  const audience = config.get('authentication.token.audience');
  const issuer = config.get('authentication.token.issuer');
  const secret = config.get('authentication.token.secret');

  const userId = genHash();
  const token = jwt.sign({ userId }, secret, {
    expiresIn,
    audience,
    issuer,
    noTimestamp: true,
  });

  return token;
}

module.exports = generateAccessToken;
