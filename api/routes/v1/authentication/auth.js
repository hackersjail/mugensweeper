const passport = require('passport');
// const passportJwt = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const JwtExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config.js');
const { getUser } = require('../../../models/v1/userStore.js');
require('dotenv').config();

const jwtOptions = {
  jwtFromRequest: JwtExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('authentication.token.secret'),
  issuer: config.get('authentication.token.issuer'),
  audience: config.get('authentication.token.audience'),
};

module.exports = () => {
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      const user = await getUser().find((u) => u.userId === payload.userId);
      if (user) done(null, user, payload);
      done();
    }),
  );
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate(['jwt'], { session: false }),
  };
};
