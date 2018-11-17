const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/dev', require('./dev/index.js'));

module.exports = app;
