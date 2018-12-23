const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const { getUser } = require('../../../models/dev/miyamoto/userStore.js');
require('dotenv').config();

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.get('authentication.token.secret'),
  issuer: config.get('authentication.token.issuer'),
  audience: config.get('authentication.token.audience'),
};

passport.use(
  new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    const users = await getUser();
    const user = users.find((u) => u.userId === jwt.decode(payload.sub));
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }),
);

passport.initialize();
