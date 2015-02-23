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
	if (!req.user){
		res.render('signin', {userValidation: req.flash('message')});
	} else {
		res.redirect('/');
	}
});

router.post('/signin', function(req, res, next){
	passport.authenticate('local', function(err, user, info){
		if (err) {
			return next(err);
		}

		if (!user) {
			req.flash('message', info.message);
			return res.redirect('/auth/signin');
		}

		req.logIn(user, function(err) {
			if (err) {
				req.flash('message', 'Database Error');
				return next(err);
			}
			return res.redirect('/');
		});
	})(req, res, next);

});

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/auth/signin' }));

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;