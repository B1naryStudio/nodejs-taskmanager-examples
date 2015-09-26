define(['marionette', './userSearch/UserCollection', './userSearch/UserCompositeView', 
	'units/boardService', './collaborators/CollaboratorCollection', 
	'./collaborators/CollaboratorCollectionView', 'app/context'], 
	function(Marionette, UserCollection, UserCompositeView, 
		boardService, CollaboratorCollection, 
		CollaboratorCollectionView, context){

	var RightPanelView = Marionette.ItemView.extend({
		template: '#right-panel-template',

		ui: {
			'addUser': '#rp-add-user',
			'collaboratorsContainer': '#collaborators-container',
			'removeBoard': '#rp-remove-board',
			'switchArchived': '#rp-switch-archived'
		},

		events: {
			'click @ui.addUser': 'onAddUserClick',
			'click @ui.removeBoard': 'onRemoveBoard',
			'click @ui.switchArchived': 'switchArchived'
		},

		modelEvents: {
			'sync': 'render'
		},

		onRender: function(){
			var self = this;
			this.showCollaboratorView();
			this.toggle = $('#task-right-panel-toggle');
			this.toggle.off();

			if (this.model.status){
				this.toggle.hide();
			}

			this.toggle.on('click', function(){
				self.toggle.toggleClass('shown');
				self.$el.parent().toggleClass('shown');
			});
		},

		onRemoveBoard: function(){
			boardService.removeBoard(this.model.get('_id'), function(err){
				if (!err){
					context.router.navigate('/', {trigger: true});
				}
			});
		},

		switchArchived: function(){
			this.archived = !this.archived;
			this.trigger('archived', this.archived);
			this.ui.switchArchived.text(!this.archived ? 'Archived Tasks' : 'Open Tasks');
		},

		showCollaboratorView: function(){
			if (!this.collaborator){
				this.collaborator = {
					collection: new CollaboratorCollection()
				};
				this.collaborator.collection.setBoard(this.model.get('_id'));
			}
			if (!this.collaborator.view){
				this.collaborator.view = new CollaboratorCollectionView({
					collection: this.collaborator.collection
				});

				this.collaborator.view.render();
			}
			this.collaborator.view.$el.appendTo(this.ui.collaboratorsContainer);
		},

		onAddUserClick: function(){
			if (!this.user){
				this.user = {
					collection: new UserCollection([], {
						boardId: this.model.get('_id')
					})
				};
			}
			if (!this.user.view){
				this.user.view = new UserCompositeView({
					collection: this.user.collection,
					model: new Backbone.Model()
				});

				this.user.view.show();
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
			boardService.addUser(this.model.get('_id'), email, function(err){
				if (!err){

				}
			});
		},

		onDestroy: function(){
			this.user.view.destroy();
			this.collaborator.view.destroy();
			delete this.user.view;
			delete this.collaborator.view;
		}
	});

	return RightPanelView;

});