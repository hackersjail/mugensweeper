const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/dev', require('./dev/index.js'));
app.use('/v1', require('./v1/index.js'));

module.exports = app;
