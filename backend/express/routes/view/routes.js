var board = require('./board');
var task = require('./task');
var auth = require('./auth');

module.exports = function(app){
	app.use('/board', board);
	app.use('/task', task);
	app.use('/auth', auth);

	app.get('/', function(req, res){
		res.render('layout', {user: req.user});
	});
};