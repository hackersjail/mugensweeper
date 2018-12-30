const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.js');
const app = require('./routes/app.js');
const { NODE_ENV, PORT } = require('./config.js');
const { connectDB } = require('./database.js');

async function start() {
  await connectDB();

  swaggerSpecs.forEach(({ version, spec, option }) => {
    if (NODE_ENV === 'production' && version === 'dev') return;
    const docs = `/docs/${version}`;
    app.use(docs, swaggerUi.serve, (req, res) => {
      res.send(swaggerUi.generateHTML(spec, option));
    });
  });

  app.listen(PORT, () => {
    if (NODE_ENV === 'development') {
      /* eslint-disable no-console */
      console.log(`API Server is listening on: http://localhost:${PORT}`);
      swaggerSpecs.forEach(({ version }) => {
        console.log(`API ${version} on: http://localhost:${PORT}/docs/${version}`);
      });
      /* eslint-enable no-console */
    }
  });
}

start();
