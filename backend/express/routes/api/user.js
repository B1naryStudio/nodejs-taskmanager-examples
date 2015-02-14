var router = require('express').Router();
var userRepository = require('../../repositories/user');
var userService = require('../../services/user');
var isLoggedIn = require('../../middleware/isLoggedIn');
var apiResponse = require('express-api-response');

router.get('/', isLoggedIn, function(req, res, next){
	userService.getUsers(req.query, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.post('/', isLoggedIn, function(req, res, next){
	var obj = req.body;
	userRepository.add(obj, function(err, data){
		if (!err && data.rowCount){
			res.data = data.rows[0];
		}
		res.err = err;
		next();
	});
}, apiResponse);


router.get('/:id', isLoggedIn, function(req, res, next){
	userRepository.findOne({id: req.params.id}, function(err, data){
		res.data = data.getViewModel();
		res.err = err;
		next();
	});
}, apiResponse);

router.delete('/:id', isLoggedIn, function(req, res, next){
	userRepository.findAndDelete({id: req.params.id}, function(err, data){
		res.err = err;
		next();
	});
}, apiResponse);

router.put('/:id', isLoggedIn, function(req, res, next){
	var obj = req.body;
	userRepository.findOneAndUpdate({id: Number(req.params.id)}, obj, function(err, data){
		res.err = err;
		next();
	});
	
}, apiResponse);

module.exports = router;