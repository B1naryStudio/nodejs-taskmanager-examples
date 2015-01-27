var express = require('express');
var app = express();

var application = require('./app');
application.configure(app);

var server = app.listen(2000);
// var ioserver = require('./io/server')(server);

module.exports = app;
