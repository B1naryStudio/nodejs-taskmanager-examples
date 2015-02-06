define(['../board/boardMediator', 'backbone'], function(boardMediator, Backbone){
	
	var AppMediator = function(){
		this.initializeRegion();
	};

	AppMediator.prototype.initializeRegion = function() {
		var Region = Marionette.Region.extend({
			el: '#content'
		});

		this.region = new Region();
	};

	AppMediator.prototype.showBoards = function(route) {
		var boardLayout = boardMediator.getLayout(route);
		this.region.show(boardLayout);
		Backbone.trigger('current-mediator', 'board');
	};

	return new AppMediator();

});