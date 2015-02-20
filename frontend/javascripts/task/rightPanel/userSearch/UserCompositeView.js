define(['marionette', './UserItemView'], 
	function(Marionette, UserItemView){

	var UserCompositeView = Marionette.CompositeView.extend({
		template: '#users-search-template',
		childView: UserItemView,
		childViewContainer: '#users-search-container',
		el: '#users-modal',
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

		childEvents: {
			'add-user': 'onAddUser'
		},

		show: function(){
			this.render();
			this.$el.toggleClass('show', true);
		},

		onDestroy: function(){
			this.$el.toggleClass('show', false);
		},

		onClose: function(){
			this.destroy();
		},

		onAddUser: function(el, email){
			this.trigger('add-user', email);
			this.collection.reset();
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
		}

	});

	return UserCompositeView;

});