define(['marionette'], function(Marionette){
	var AddNewBoardView = Marionette.ItemView.extend({
		template: '#new-board-template',
		ui: {
			'cancel': '#new-board-cancel',
			'name': '#new-board-name',
			'isPrivate': '#new-board-private',
			'createBoard': '#create-board'
		},

		events: {
			'click @ui.createBoard': 'onCreateBoard'
		},

		onCreateBoard: function(){
			var name = this.ui.name.val();
			var isPrivate = this.ui.isPrivate.val();
			this.trigger('add', {
				name: name,
				isPrivate: isPrivate
			});
		}
	});

	return AddNewBoardView;
});