var passport = require('passport');
var userService = require('../../services/user');
var router = require('express').Router();

router.get('/signup', function(req, res, next){
	res.render('signup');
});

router.post('/signup', function(req, res){
	var data = {
		email: req.body.email,
		password: req.body.password
	};

	userService.createUser(data, function(err, user){
		req.login(user, function(err) {
			if (err) { return next(err); }
				return res.redirect('/');
		});
	});

});

router.get('/signin', function(req, res, next){
	res.render('signin');
});

router.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/signin', failureFlash: true }));

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/auth/signin' }));

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;