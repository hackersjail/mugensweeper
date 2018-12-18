const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/dev', require('./dev/index.js'));
app.use('/v1/userId', require('./v1/userId.js'));

module.exports = app;
