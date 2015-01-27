var board = require('./board');
var task = require('./task');

module.exports = function(app){
	app.use('/board', board);
	app.use('/task', task);
};