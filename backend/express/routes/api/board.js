var router = require('express').Router();
var boardRepository = require('../../repositories/board');
var boardService = require('../../services/board');
var isLoggedIn = require('../../middleware/isLoggedIn');
var apiResponse = require('express-api-response');
var isBoardMember = require('../../middleware/isBoardMember');
var isBoardAdmin = require('../../middleware/isBoardAdmin');

router.get('/', isLoggedIn, function(req, res, next){
	boardService.findBoardsByUserId(req.user._id, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.post('/', isLoggedIn, function(req, res, next){
	var obj = req.body;
	boardService.add(obj, req.user._id, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.get('/:id', isLoggedIn, isBoardMember, function(req, res, next){
	boardRepository.findOne({_id: req.params.id}, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.get('/:id/task', isLoggedIn, isBoardMember, function(req, res, next){
	boardService.findUnarchivedTasks(req.params.id, function(err, data){
		if (data){
			res.data = data;
		}
		res.err = err;
		next();
	});
}, apiResponse);

router.get('/:id/task/archived', isLoggedIn, isBoardMember, function(req, res, next){
	boardService.findArchivedTasks(req.params.id, function(err, data){
		if (data){
			res.data = data;
		}
		res.err = err;
		next();
	});
}, apiResponse);

router.get('/:id/user', isLoggedIn, isBoardMember, function(req, res, next){
	boardService.findBoardUsers(req.params.id, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.post('/:id/user', isLoggedIn, isBoardAdmin, function(req, res, next){
	var userEmail = req.body.email;
	boardService.addUser(req.params.id, userEmail, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.put('/:id/user', isLoggedIn, isBoardAdmin, function(req, res, next){
	var isAdmin = req.body.isAdmin;
	boardService.changeUserRights(req.params.id, {isAdmin: isAdmin}, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.delete('/:id/user', isLoggedIn, isBoardAdmin, function(req, res, next){
	boardService.deleteUser(req.params.id, function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);

router.delete('/:id', isLoggedIn, isBoardAdmin, function(req, res, next){
	boardRepository.findAndDelete({_id: req.params.id}, function(err, data){
		res.err = err;
		next();
	});
}, apiResponse);

router.put('/:id', isLoggedIn, isBoardAdmin, function(req, res, next){
	var obj = req.body;
	boardRepository.findOneAndUpdate({_id: Number(req.params.id)}, obj, function(err, data){
		res.err = err;
		next();
	});
	
}, apiResponse);

module.exports = router;