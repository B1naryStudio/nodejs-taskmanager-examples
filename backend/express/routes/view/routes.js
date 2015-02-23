var board = require('./board');
var task = require('./task');
var auth = require('./auth');

var renderWithData = require('../../middleware/renderWithData');
var isLoggedIn = require('../../middleware/isLoggedIn');

module.exports = function(app){
	app.use('/board', board);
	app.use('/task', task);
	app.use('/auth', auth);

	app.get('/', isLoggedIn, renderWithData);
};