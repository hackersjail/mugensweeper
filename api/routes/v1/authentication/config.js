require('dotenv').config();

module.exports = {
  SECRET_KEY: process.env.JWT_SIGNING_KEY || 'mugensweepers',
  ISSURE: 'mugensweepers',
  AUDIENCE: 'mugensweepers',
};
