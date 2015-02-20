define(['marionette'], function(Marionette){
	var AddNewBoardView = Marionette.ItemView.extend({
		className: 'create-board-modal', 
		template: '#new-board-template',
		ui: {
			'cancel': '#new-board-cancel',
			'name': '#new-board-name',
			'isPrivate': '#new-board-private',
			'createBoard': '#create-board'
		},

		events: {
			'click @ui.createBoard': 'onCreateBoard',
			'click @ui.cancel': 'hide'
		},

		onCreateBoard: function(){
			var name = this.ui.name.val();
			var isPrivate = this.ui.isPrivate.val();
			this.trigger('add', {
				name: name,
				isPrivate: isPrivate
			});
			this.hide();
		},

		show: function(coords){
			this.render();
			this.bindUIElements();
			this.delegateEvents();
			this.$el.appendTo(document.body);
			this.$el.css({
				top: coords.top,
				left: coords.left
			});
		},

		hide: function(){
			this.$el.remove();
			this.undelegateEvents();
		}
	});

	return AddNewBoardView;
});