define(['../units/Mediator', 'backbone', './Board', './BoardCompositeView',
	'./BoardCollection', './LandingLayout'], 
	function(Mediator, Backbone, Board, BoardCompositeView,
		BoardCollection, LandingLayout){

	var LandingMediator = function(){
		Mediator.prototype.constructor.call(this);
	};

	LandingMediator.prototype = new Mediator();

	LandingMediator.prototype.id = 'board';

	LandingMediator.prototype.getLayout = function(route) {
		if (!this.layout){
			this.initializeLayout(route);
		} 
		return this.layout;
	};

	LandingMediator.prototype.initializeLayout = function(route) {
		var self = this;

		this.layout = new LandingLayout();
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

	LandingMediator.prototype.getBoardsView = function() {
			var self = this;
			if (!this.board){
				this.board = {};
				this.board.collection = new BoardCollection();
			}
			this.board.collection.fetch({
				error: function(){
					self.board.collection.reset();
				}
			});
			this.board.view = new BoardCompositeView({
				collection: this.board.collection,
				model: new Board()
			});

			return this.board.view;
	};

	LandingMediator.prototype.showBoards = function() {
		var boardsView = this.getBoardsView();
		this.regions.boardContent.show(boardsView);
	};

	LandingMediator.prototype.initializeRoutes = function() {
		this.routes = {
			'': 'showBoards'
		};
	};

	return new LandingMediator();

});