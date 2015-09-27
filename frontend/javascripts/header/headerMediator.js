define(['./GoToBoardsView', './UserView', './User', 'backbone',
	'./HeaderTitle', './HeaderTitleView'], 
	function(GoToBoardsView, UserView, User, Backbone,
		HeaderTitle, HeaderTitleView){

	var HeaderMediator = function(params){
		this.bindListeners();
		this.initializeRegions();
	};

	HeaderMediator.prototype.initializeRegions = function() {
		this.regionManager = new Marionette.RegionManager();
		this.regions = this.regionManager.addRegions({
			headerLeft: '#header-left',
			headerRight: '#header-right',
			headerCenter: '#header-center'
		});
	};

	HeaderMediator.prototype.bindListeners = function() {
		Backbone.on('current-mediator', function(options){
			var mediatorName = options.name;
			if (mediatorName !== 'landing'){
				this.showGoToBoardsView();
			} else {
				this.board = undefined;
				this.hideGoToBoardsView();
			}

			this.regions.headerCenter.show(this.getHeaderTitleView());

		}, this);

		Backbone.once('current-mediator', function(){
			this.regions.headerRight.show(this.getUserView());
		}, this);

		Backbone.on('current-board', function(boardName){
			this.board = boardName;

			var headerTitleView = this.getHeaderTitleView();
			this.regions.headerCenter.show(headerTitleView);
		}, this);
	};

	HeaderMediator.prototype.showGoToBoardsView = function() {
		var goToBoardsView = this.getGoToBoardsView();
		this.regions.headerLeft.show(goToBoardsView);		
	};

	HeaderMediator.prototype.showHeaderTitleView = function() {
		var headerTitleView = this.getHeaderTitleView();
		this.regions.headerLeft.show(headerTitleView);		
	};

	HeaderMediator.prototype.hideGoToBoardsView = function() {
		this.regions.headerLeft.reset();		
	};

	HeaderMediator.prototype.getGoToBoardsView = function() {
		return new GoToBoardsView();
	};

	HeaderMediator.prototype.getHeaderTitleView = function() {
		if (!this.header){
			this.header = {
				model: new HeaderTitle({
					board: this.board
				})
			};
		} else {
			this.header.model.set('board', this.board);
		}
		this.header.view = new HeaderTitleView({
			model: this.header.model
		});

		return this.header.view;
	};

	HeaderMediator.prototype.getUserView = function() {
		if (!this.user){
			this.user = {
				model: new User(window.__data.user)
			};
		}
		this.user.view = new UserView({
			model: this.user.model
		});
		return this.user.view;
	};

	return new HeaderMediator();
});