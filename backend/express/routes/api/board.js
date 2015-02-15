var router = require('express').Router();
var boardRepository = require('../../repositories/board');
var boardService = require('../../services/board');
var isLoggedIn = require('../../middleware/isLoggedIn');
var apiResponse = require('express-api-response');

router.get('/', isLoggedIn, function(req, res, next){
	boardService.findBoardsForUserId(req.user, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.post('/', isLoggedIn, function(req, res, next){
	var obj = req.body;
	boardRepository.add(obj, function(err, data){
		if (!err && data.rowCount){
			res.data = data.rows[0];
		}
		res.err = err;
		next();
	});
}, apiResponse);

router.get('/:id', isLoggedIn, function(req, res, next){
	boardRepository.findOne({_id: req.params.id}, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.get('/:id/task', isLoggedIn, function(req, res, next){
	boardRepository.findOneAndPopulate({_id: req.params.id}, function(err, data){
		if (data){
			res.data = data.tasks;
		}
		res.err = err;
		next();
	});
}, apiResponse);

router.post('/:id/user', isLoggedIn, function(req, res, next){
	var userEmail = req.body.email;
	boardService.addUser(req.params.id, userEmail, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.delete('/:id', isLoggedIn, function(req, res, next){
	boardRepository.findAndDelete({_id: req.params.id}, function(err, data){
		res.err = err;
		next();
	});
}, apiResponse);

router.put('/:id', isLoggedIn, function(req, res, next){
	var obj = req.body;
	boardRepository.findOneAndUpdate({_id: Number(req.params.id)}, obj, function(err, data){
		res.err = err;
		next();
	});
	
}, apiResponse);

module.exports = router;