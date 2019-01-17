const passport = require('passport');
const passportJwt = require('passport-jwt');
const config = require('./config.js');
const { getUser } = require('../../../models/v1/userStore.js');
require('dotenv').config();

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('authentication.token.secret'),
  issuer: config.get('authentication.token.issuer'),
  audience: config.get('authentication.token.audience'),
};

module.exports = () => {
  passport.use(
    new passportJwt.Strategy(jwtOptions, async (payload, done) =>
      done(null, (await getUser().find((u) => u.userId === payload.userId)) || false),
    ),
  );
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate(['jwt'], { session: false }),
  };
};
