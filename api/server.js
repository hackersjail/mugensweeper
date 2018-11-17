const app = require('./routes/app.js');
const { NODE_ENV, PORT } = require('./config.js');

app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    console.log(`API Server is listening on http://localhost:${PORT}`);
  }
});
