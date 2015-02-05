define(['marionette', './appMediator', './context'], 
	function(Marionette, appMediator, context){

	var Router = Marionette.AppRouter.extend({
		appRoutes: {
			'': 'showSearch',
			'business/:route': 'showBusiness',
			'admin/:route': 'showAdmin',
			'signin' : 'showSignin',
			'signup' : 'showSignup',
			'search': 'showSearch'	
		}
	});

	var router = new Router({
		controller : appMediator
	});

	context.router = router;

	return router;

});