var router = require('express').Router();
var taskRepository = require('../../repositories/taskRepository');
var isLoggedIn = require('../../middleware/isLoggedIn');
var apiResponse = require('express-api-response');

router.get('/', isLoggedIn, function(req, res, next){
	taskRepository.findWhere({}, function(err, data){
		res.data = data.map(function(it){return it.getViewModel();});
		res.err = err;
		next();
	});
}, apiResponse);

router.post('/', isLoggedIn, function(req, res, next){
	var obj = req.body;
	taskRepository.add(obj, function(err, data){
		if (!err && data.rowCount){
			res.data = data.rows[0];
		}
		res.err = err;
		next();
	});
}, apiResponse);


router.get('/:id', isLoggedIn, function(req, res, next){
	taskRepository.findOne({id: req.params.id}, function(err, data){
		res.data = data.getViewModel();
		res.err = err;
		next();
	});
}, apiResponse);

router.delete('/:id', isLoggedIn, function(req, res, next){
	taskRepository.findAndDelete({id: req.params.id}, function(err, data){
		res.err = err;
		next();
	});
}, apiResponse);

router.put('/:id', isLoggedIn, function(req, res, next){
	var obj = req.body;
	taskRepository.findOneAndUpdate({id: Number(req.params.id)}, obj, function(err, data){
		res.err = err;
		next();
	});
	
}, apiResponse);

module.exports = router;