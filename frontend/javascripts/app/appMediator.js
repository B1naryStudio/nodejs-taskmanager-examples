define(['../landing/landingMediator', '../board/boardMediator', '../header/headerMediator',
	'marionette', 'backbone'], 
	function(landingMediator, boardMediator, headerMediator,
		Marionette, Backbone){
	
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
		var landingLayout = landingMediator.getLayout(route);
		this.regions.content.show(landingLayout);
		this.regions.headerLeft.reset();
		Backbone.trigger('current-mediator', 'board');
	};

	AppMediator.prototype.showTasks = function(route){
		var boardLayout = boardMediator.getLayout(route);
		this.regions.content.show(boardLayout);
		Backbone.trigger('current-mediator', 'task');
	};

	return new AppMediator();

});