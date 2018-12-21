const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/dev', require('./dev/index.js'));
app.use('/v1', require('./v1/index.js'));

module.exports = app;
