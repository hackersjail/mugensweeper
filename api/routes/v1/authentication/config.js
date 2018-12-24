const convict = require('convict');
require('dotenv').config();

const config = convict({
  http: {
    port: {
      doc: 'The port to listen on',
      default: 3000,
      env: 'PORT',
    },
  },
  authentication: {
    token: {
      secret: {
        doc: 'The signing key for the JWT',
        default: 'mugensweepers',
        env: 'JWT_SIGNING_KEY',
      },
      issuer: {
        doc: 'The issuer for the JWT',
        default: 'mugensweepers',
      },
      audience: {
        doc: 'The audience for the JWT',
        default: 'mugensweepers',
      },
    },
  },
});

config.validate();

module.exports = config;
