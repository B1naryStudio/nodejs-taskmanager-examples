define(['marionette', './appMediator', './context'], 
	function(Marionette, appMediator, context){

	var Router = Marionette.AppRouter.extend({
		appRoutes: {
			'': 'showBoards',
			'board/:id': 'showTasks',
			'board/:id/task/:task_id': 'showTask'
		}
	});

	var router = new Router({
		controller : appMediator
	});

	context.router = router;

	return router;

});