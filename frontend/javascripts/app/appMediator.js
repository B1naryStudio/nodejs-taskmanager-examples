define(['../board/boardMediator', '../task/taskMediator', 'marionette', 'backbone',
	'../header/headerMediator'], 
	function(boardMediator, taskMediator, Marionette, Backbone,
		headerMediator){
	
	var AppMediator = function(){
		this.initializeRegion();
	};

	AppMediator.prototype.initializeRegion = function() {
		this.regionManager = new Marionette.RegionManager();
		this.regions = this.regionManager.addRegions({
			content: '#content',
			headerLeft: '#header-left'
		});
	};

	AppMediator.prototype.showBoards = function(route) {
		var boardLayout = boardMediator.getLayout(route);
		this.regions.content.show(boardLayout);
		this.regions.headerLeft.reset();
		Backbone.trigger('current-mediator', 'board');
	};

	AppMediator.prototype.showTasks = function(route){
		var taskLayout = taskMediator.getLayout(route);
		this.regions.content.show(taskLayout);
		var goToBoardsView = headerMediator.getGoToBoardsView();
		this.regions.headerLeft.show(goToBoardsView);
		Backbone.trigger('current-mediator', 'task');
	};

	return new AppMediator();

});