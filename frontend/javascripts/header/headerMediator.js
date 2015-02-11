define(['./GoToBoardsView', './UserView', './User', 'backbone'], 
	function(GoToBoardsView, UserView, User, Backbone){

	var HeaderMediator = function(params){
		this.bindListeners();
		this.initializeRegions();
	};

	HeaderMediator.prototype.initializeRegions = function() {
		this.regionManager = new Marionette.RegionManager();
		this.regions = this.regionManager.addRegions({
			headerLeft: '#header-left',
			headerRight: '#header-right'
		});
	};

	HeaderMediator.prototype.bindListeners = function() {
		Backbone.on('current-mediator', function(mediatorName){
			if (this.mediatorName === 'boards'){
				this.showGoToBoardsView();
			} else {
				this.hideGoToBoardsView();
			}
		}, this);
	};

	HeaderMediator.prototype.showGoToBoardsView = function() {
		var goToBoardsView = this.getGoToBoardsView();
		this.regions.headerLeft.show(goToBoardsView);		
	};

	HeaderMediator.prototype.hideGoToBoardsView = function() {
		this.regions.headerLeft.reset();		
	};

	HeaderMediator.prototype.getGoToBoardsView = function() {
		return new GoToBoardsView();
	};

	HeaderMediator.prototype.getUserView = function() {
		if (!this.user){
			this.user = {
				model: new User()
			};
		}
		this.user.view = new UserView({
			model: this.user.model
		});
	};

	return new HeaderMediator();
});