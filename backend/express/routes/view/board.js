var router = require('express').Router();
var boardRepository = require('../../repositories/board');
var isLoggedIn = require('../../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res, next){
	boardRepository.findWhere({}, function(err, data){
		res.data = data.map(function(it){return it.getViewModel();});
		res.err = err;
		next();
	});
});

router.get('/:id', isLoggedIn, function(req, res, next){
	boardRepository.findOne({id: req.params.id}, function(err, data){
		res.data = data.getViewModel();
		res.err = err;
		next();
	});
});

module.exports = router;