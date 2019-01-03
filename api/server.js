const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.js');
const app = require('./routes/app.js');
const { NODE_ENV, PORT } = require('./config.js');
const { connectDB } = require('./database.js');

const { initData } = require('./models/v1/fieldStore.js');
const { saveData } = require('./models/v1/fieldStore.js');

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

  await initData();

  function sleep(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  async function exec() {
    const startTime = Date.now(); // 開始時間
    await saveData();
    const endTime = Date.now(); // 終了時間
    const time = endTime - startTime;
    await sleep(time < 1000 ? 1000 - time : 0);
  }

  while (true) {
    await exec();
  }
}

start();
