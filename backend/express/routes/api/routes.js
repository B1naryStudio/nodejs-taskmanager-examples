var board = require('./board');
var task = require('./task');
var user = require('./user');

module.exports = function(app){
	// console.log('asdasdas');
	// app.get('/api/asd', function(req, res, next){
	// 	console.log('asd');
	// 	res.end('asd');
	// });

	app.use('/api/board', board);
	app.use('/api/task', task);
	app.use('/api/user', user);
};