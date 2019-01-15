const swaggerJSDoc = require('swagger-jsdoc');
const { NODE_ENV, HOST, PORT } = require('./config.js');

const customSiteTitle = 'MugenSweeper API';
const versions = {
  v1: {
    title: customSiteTitle,
    version: process.env.npm_package_version,
    description: `Document for MugenSweeper API`,
  },
  dev: {
    title: customSiteTitle,
    description: 'Practice API for Swagger',
  },
};

module.exports = Object.keys(versions).map((version) => ({
  version,
  spec: swaggerJSDoc({
    swaggerDefinition: {
      swagger: '2.0',
      info: versions[version],
      host: NODE_ENV === 'development' ? `${HOST}:${PORT}` : HOST,
      basePath: `/${version}`,
      consumes: ['application/x-www-form-urlencoded'],
      produces: ['application/json'],
    },
    apis: [`./api/docs/${version}/**/*.yml`],
  }),
  option: {
    customSiteTitle,
  },
}));
