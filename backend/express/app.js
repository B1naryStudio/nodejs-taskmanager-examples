var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var MongoStore = require('connect-mongo')(session);
var dbConnectionHandler = require('./units/dbConnectionHandler');

var config = require('./config');
var context = require('./units/context');

var Application = function(){};

Application.prototype.configure = function(app){

	app.set('views', path.normalize(__dirname + '/../../frontend/views'));
	app.set('view engine', 'jade');

	var staticPath = path.normalize(__dirname + '/../../public');
	app.use(express.static(staticPath));
	
	staticPath = path.normalize(__dirname + '/../../frontend/bower_components');
	app.use('/bower_components', express.static(staticPath));

	context.mongoStore = new MongoStore({
		mongooseConnection : dbConnectionHandler.connection
	});

	app.use(session({
		secret: config.session.secret,
		store: context.mongoStore,
		resave: true,
		saveUninitialized: true
	}));

	var acl = require('./units/acl')();

	var authenticationInitializer = require('./units/authentication')();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	var routes = require('./routes/api/routes')(app);
	var viewRoutes = require('./routes/view/routes')(app);
};

module.exports = new Application();
