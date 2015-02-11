define(['./GoToBoardsView'], function(GoToBoardsView){

	var HeaderMediator = function(params){

	};

	HeaderMediator.prototype.getGoToBoardsView = function() {
		return new GoToBoardsView();
	};

	return new HeaderMediator();
});