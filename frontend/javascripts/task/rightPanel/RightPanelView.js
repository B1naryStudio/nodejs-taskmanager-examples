define(['marionette', './UserCollection', './UserCompositeView'], 
	function(Marionette, UserCollection, UserCompositeView){

	var RightPanelView = Marionette.ItemView.extend({
		template: '#right-panel-template',

		ui: {
			'addUser': '#rp-add-user'
		},

		events: {
			'click @ui.addUser': 'onAddUser'
		},

		onAddUser: function(){
			if (!this.user){
				this.user = {
					collection: new UserCollection()
				};
			}
			if (!this.user.view){
				this.user.view = new UserCompositeView({
					collection: this.user.collection,
					model: new Backbone.Model()
				});

				this.user.view.show({
					top: event.clientY,
					left: event.clientX
				});
			}
			this.user.view.on('change-text', function(text){
				this.user.collection.setText(text);
			}, this);
			this.user.view.on('reset', function(text){
				this.user.collection.reset();
			}, this);
			this.user.view.on('destroy', function(){
				delete this.user.view;
			}, this);
		},

		onDestroy: function(){
			this.user.view.destroy();
			delete this.user.view;
		}
	});

	return RightPanelView;

});