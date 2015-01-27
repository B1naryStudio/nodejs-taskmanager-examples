var board = require('./board');
var task = require('./task');
var user = require('./user');

module.exports = function(app){
	app.use('/api/board', board);
	app.use('/api/task', task);
	app.use('/api/user', user);
};