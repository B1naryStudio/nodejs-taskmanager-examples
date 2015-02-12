define(['marionette', './UserItemView'], function(Marionette, UserItemView){

	var UserCompositeView = Marionette.CompositeView.extend({
		template: '#users-search-template',
		childView: UserItemView,
		childViewContainer: '#users-search-container',
		id: 'users-modal',

		ui: {
			'userSearch': '#user-search',
			'close': '#users-modal-close',
			'user': '.user-result'
		},

		events: {
			'keydown @ui.userSearch': 'onChange',
			'click @ui.userResult': 'onClose',
			'click @ui.close': 'onClose'
		},

		onClose: function(){
			this.destroy();
		},

		onChange: function(event){
			if (event.which === 27){
				this.onClose();
				return;
			}
			this.trigger('change-text', this.ui.userSearch.val());
		},

		show: function(coords){
			this.render();
			this.$el.appendTo($('body'));
			this.$el.css({
				top: coords.top,
				left: coords.left
			});
		}

	});

	return UserCompositeView;

});