const swaggerJSDoc = require('swagger-jsdoc');

const customSiteTitle = 'MugenSweeper API';
const versions = {
  v1: {
    title: customSiteTitle,
    version: '0.0.1',
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
      basePath: `/${version}`,
      consumes: ['application/x-www-form-urlencoded'],
      produces: ['application/json'],
    },
    apis: [`./api/docs/${version}/*.yml`],
  }),
  option: {
    customSiteTitle,
  },
}));
