const router = require('express').Router();
// const passport = require('passport');
const jwt = require('jsonwebtoken');
const { addUser } = require('../../models/dev/miyamoto/userStore.js');
const { generateAccessToken } = require('./userIdGenerate/token.js');
// require('./userIdGenerate/auth.js');

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

router.use('/', async (req, res) => {
  const user = {};
  const token = await generateAccessToken();
  const { userId } = jwt.decode(token);
  const { userName } = req.body;
  if (userName !== null && userName !== undefined) {
    user.userName = userName;
    user.userId = userId;
    // user.token = `JWT ${token}`;
    user.token = token;
    addUser(user);
  } else {
    user.userName = null;
    user.userId = null;
    user.token = null;
  }
  res.json(user);
});

const config = {
  appRoot: __dirname, // required config
};
config.swaggerSecurityHandlers = {
  tokenAuth(req, authOrSecDef, scopesOrApiKey) {
    try {
      const decoded = jwt.decode(scopesOrApiKey);
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

router.use((req, res, next) => {
  try {
    const headerValue = req.headers.authorization;
    const accessToken = jwt.decode(headerValue);
    const isUserId = Object.keys(accessToken).indexOf('userId') !== -1;
    if (isUserId) {
      next();
    } else {
      res.status(401).end();
    }
  } catch (e) {
    res.status(401).end();
  }
});

// 以下にルーティング処理を記述
// router.use(
//   '/miyamoto/block',
//   passport.authenticate('jwt', { session: false }),
//   require('../../dev/miyamoto/block.js'),
// );

module.exports = router;
