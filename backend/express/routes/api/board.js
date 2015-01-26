var boardRepository = require('../../repositories/boardRepository');
var isLoggedIn = require('../../middleware/isLoggedIn');
var apiResponse = require('express-api-response');

module.exports = function(app){

	app.get('/api/board', isLoggedIn, function(req, res, next){
		boardRepository.findWhere({}, function(err, data){
			res.data = data.map(function(it){return it.getViewModel();});
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/board', isLoggedIn, function(req, res, next){
		var obj = req.body;
		boardRepository.add(obj, function(err, data){
			if (!err && data.rowCount){
				res.data = data.rows[0];
			}
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/board/:id', isLoggedIn, function(req, res, next){
		boardRepository.findOne({id: req.params.id}, function(err, data){
			res.data = data.getViewModel();
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/board/:id', isLoggedIn, function(req, res, next){
		boardRepository.findAndDelete({id: req.params.id}, function(err, data){
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/board/:id', isLoggedIn, function(req, res, next){
		var obj = req.body;
		boardRepository.findOneAndUpdate({id: Number(req.params.id)}, obj, function(err, data){
			res.err = err;
			next();
		});
		
	}, apiResponse);

}; 