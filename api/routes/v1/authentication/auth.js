const passport = require('passport');
const passportJwt = require('passport-jwt');
const config = require('./config.js');
const { getUser } = require('../../../models/v1/userStore.js');
require('dotenv').config();

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.authentication.token.secret.key,
  issuer: config.authentication.token.issuer.default,
  audience: config.authentication.token.audience.default,
};

module.exports = () => {
  passport.use(
    new passportJwt.Strategy(jwtOptions, async (payload, done) =>
      done(
        null,
        process.env.NODE_ENV === 'test'
          ? { userName: 'tester', userId: 'example0', recordtime: '2019-01-01T00:00:00.000Z' } // テスト用token認証ユーザー
          : (await getUser().find((u) => u.userId === payload.userId)) || false,
      ),
    ),
  );
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate(['jwt'], { session: false }),
  };
};
