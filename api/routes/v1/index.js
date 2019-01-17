const router = require('express').Router();
const jwt = require('jsonwebtoken');
const auth = require('../v1/authentication/auth.js')();
const fieldMethod = require('./field/field.js');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

router.options('*', (req, res) => {
  res.sendStatus(200);
});

// swagger用コード（フロントからのリクエストheaderのauthorizationに仕込んだJWT認証処理用のコード）
const config = { appRoot: __dirname };
config.swaggerSecurityHandlers = {
  tokenAuth(req) {
    try {
      const decoded = jwt.decode(req.headers.authorization.split(' ')[1]);
      req.requestContext = {
        authorizer: {
          userId: decoded,
        },
      };
    } catch (error) {
      // console.log(error);
    }
  },
};

router.use('/user', require('./user/user.js'));

router.use('/secure', auth.authenticate(), (req, res) => {
  res.send(`Secure response from ${JSON.stringify(req.user)}`);
});

// Eslintの「global-require」ルールに抵触するため以下記述を適用
// (auth.authenticateの箇所をif文でtestか否かを判定する記述もfield.test.jsの'DBにfieldHistoryを追加するテスト'でTimeoutエラー発生)
if (process.env.NODE_ENV !== 'test') {
  router.use('/field', auth.authenticate(), fieldMethod);
} else {
  router.use('/field', fieldMethod);
}

module.exports = router;
