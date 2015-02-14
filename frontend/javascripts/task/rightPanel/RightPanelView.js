define(['marionette', './UserCollection', './UserCompositeView', 'units/boardService'], 
	function(Marionette, UserCollection, UserCompositeView, boardService){

	var RightPanelView = Marionette.ItemView.extend({
		template: '#right-panel-template',

		ui: {
			'addUser': '#rp-add-user'
		},

		events: {
			'click @ui.addUser': 'onAddUserClick'
		},

		onAddUserClick: function(){
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
			this.bindUserListeners();
		},

		bindUserListeners: function(){
			this.user.view.on('change-text', function(text){
				this.user.collection.setText(text);
			}, this);
			this.user.view.on('reset', function(text){
				this.user.collection.reset();
			}, this);
			this.user.view.on('destroy', function(){
				delete this.user.view;
			}, this);
			this.user.view.on('add-user', this.onAddUser, this);
		},

		onAddUser: function(email){
			boardService.addUser(this.options.boardId, email, function(err){
				if (!err){

				}
			});
		},

		onDestroy: function(){
			this.user.view.destroy();
			delete this.user.view;
		}
	});

	return RightPanelView;

});