const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.js');
const app = require('./routes/app.js');
const sleep = require('./util/sleep.js');
const FieldHistoryModel = require('./models/v1/FieldHistoryModel.js');
const UserModel = require('./models/v1/UserModel.js');
const { NODE_ENV, HOST, PORT } = require('./config.js');
const { connectDB } = require('./database.js');
const { initData, saveData, getData } = require('./models/v1/fieldStore.js');
const { initBomb, saveBomb } = require('./models/v1/bombStore.js');
const { initUser } = require('./models/v1/userStore.js');

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
      console.log(`API Server is listening on: http://${HOST}:${PORT}`);
      swaggerSpecs.forEach(({ version }) => {
        console.log(`API ${version} on: http://${HOST}:${PORT}/docs/${version}`);
      });
      /* eslint-enable no-console */
    }
  });

  await Promise.all([initUser(), initBomb()]);
  await initData();

  if (getData().length === 0) {
    await new UserModel({ userName: 'master', userId: '00000000' }).save();
    await new FieldHistoryModel({ x: 0, y: 0, userId: '00000000' }).save();

    await Promise.all([initUser(), initBomb()]);
    await initData();
  }

  // 検証への使用度高関数のため保存
  // await Promise.all([deleteBomb(), deleteData()]);

  while (true) {
    const startTime = Date.now(); // 開始時間
    await Promise.all([saveData(), saveBomb()]);
    const endTime = Date.now(); // 終了時間
    const time = endTime - startTime;
    await sleep(time < 1000 ? 1000 - time : 0);
  }
}

start();
