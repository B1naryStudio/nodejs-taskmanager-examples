var userRepository = require('../../repositories/userRepository');
var isLoggedIn = require('../../middleware/isLoggedIn');
var apiResponse = require('express-api-response');

module.exports = function(app){

	app.get('/api/user', isLoggedIn, function(req, res, next){
		userRepository.findWhere({}, function(err, data){
			res.data = data.map(function(it){return it.getViewModel();});
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/user', isLoggedIn, function(req, res, next){
		var obj = req.body;
		userRepository.add(obj, function(err, data){
			if (!err && data.rowCount){
				res.data = data.rows[0];
			}
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/user/:id', isLoggedIn, function(req, res, next){
		userRepository.findOne({id: req.params.id}, function(err, data){
			res.data = data.getViewModel();
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/user/:id', isLoggedIn, function(req, res, next){
		userRepository.findAndDelete({id: req.params.id}, function(err, data){
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/user/:id', isLoggedIn, function(req, res, next){
		var obj = req.body;
		userRepository.findOneAndUpdate({id: Number(req.params.id)}, obj, function(err, data){
			res.err = err;
			next();
		});
		
	}, apiResponse);

}; 