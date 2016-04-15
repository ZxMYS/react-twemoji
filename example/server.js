var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.local.config.js');

var app = express();
var compiler = webpack(config);

app.use(express.static(__dirname + '/dist'));
app.use(webpackMiddleware(compiler));
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080);
