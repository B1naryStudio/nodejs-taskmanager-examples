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
			'keyup @ui.userSearch': 'onChange',
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
			var text = this.ui.userSearch.val();
			if (text){
				this.trigger('change-text', text);
			} else {
				this.trigger('reset');
			}
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