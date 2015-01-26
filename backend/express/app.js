var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');
var flash = require('connect-flash');
var PgStore = require('connect-pg-simple')(session);
var pg = require('pg');

var config = require('./config/');
var context = require('./units/context');

var Application = function(){};

Application.prototype.configure = function(app){

	app.set('views', path.normalize(__dirname + '/../frontend/views'));
	app.set('view engine', 'jade');
		
	var logger = require('./units/logger');
	logger.info('Server is running');

	var staticPath = path.normalize(__dirname + '/../public');
	app.use(express.static(staticPath));
	
	staticPath = path.normalize(__dirname + '/../bower_components');
	app.use('/bower_components', express.static(staticPath));

	var config = require('./config/');

	context.mongoStore = new MongoStore({
		mongoose_connection : mongoose.connection
	});

	app.use(session({
		secret: config.session.secret,
		store: context.mongoStore
	}));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	var pass = require('./units/passport')();

	var routes = require('./routes/api/routes')(app);
	var viewRoutes = require('./routes/view/routes')(app);
};

module.exports = new Application();
