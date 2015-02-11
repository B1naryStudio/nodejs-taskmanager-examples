define(['marionette'], function(Marionette){
	
	var GoToBoardsView = Marionette.ItemView.extend({
		template: '#go-to-boards-template'
	});

	return GoToBoardsView;
});