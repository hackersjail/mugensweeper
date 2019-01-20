require('dotenv').config();

module.exports = {
  authentication: {
    token: {
      secret: {
        doc: 'The signing key for the JWT',
        key: process.env.JWT_SIGNING_KEY || 'mugensweepers',
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
};
