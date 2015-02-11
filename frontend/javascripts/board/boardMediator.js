define(['../units/Mediator', 'backbone', './Board', './BoardCompositeView',
	'./BoardCollection', './BoardLayout'], 
	function(Mediator, Backbone, Board, BoardCompositeView,
		BoardCollection, BoardLayout){

	var BoardMediator = function(){
		Mediator.prototype.constructor.call(this);
	};

	BoardMediator.prototype = new Mediator();

	BoardMediator.prototype.id = 'board';

	BoardMediator.prototype.getLayout = function(route) {
		if (!this.layout){
			this.initializeLayout(route);
		} 
		return this.layout;
	};

	BoardMediator.prototype.initializeLayout = function(route) {
		var self = this;

		this.layout = new BoardLayout();
		this.layout.on('show', function(){
			self.regionManager = new Marionette.RegionManager();
			self.regions = self.regionManager.addRegions({
				boardContent: '#board-content'
			});
			var matched = self.matchRoute(route);
		});
		
		self.layout.on('destroy', function(){
			delete self.layout;
		});
	};

	BoardMediator.prototype.getBoardsView = function() {
			var self = this;
			if (!this.board){
				this.board = {};
				this.board.collection = new BoardCollection();
			}
			this.board.collection.fetch();
			this.board.view = new BoardCompositeView({
				collection: this.board.collection,
				model: new Board()
			});

			return this.board.view;
	};

	BoardMediator.prototype.showBoards = function() {
		var boardsView = this.getBoardsView();
		this.regions.boardContent.show(boardsView);
	};

	BoardMediator.prototype.initializeRoutes = function() {
		this.routes = {
			'': 'showBoards'
		};
	};

	return new BoardMediator();

});