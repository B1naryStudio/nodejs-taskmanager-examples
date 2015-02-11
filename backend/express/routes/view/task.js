var router = require('express').Router();
var taskRepository = require('../../repositories/task');
var isLoggedIn = require('../../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res, next){
	res.render('layout');
});

router.get('/:id', isLoggedIn, function(req, res, next){
	res.render('layout');
});

module.exports = router;