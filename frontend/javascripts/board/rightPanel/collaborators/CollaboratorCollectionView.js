define(['marionette', './CollaboratorView', './UserMenuView', 'board/boardService'], 
	function(Marionette, CollaboratorView, UserMenuView, boardService){

	var CollaboratorCollectionView = Marionette.CollectionView.extend({
		template: '#collaborator-collection-view-template',
		childView: CollaboratorView,

		childEvents: {
			'click': 'onCollaboratorClick'
		},

		onCollaboratorClick: function(view, model){
			this.userMenuView = new UserMenuView({
				model: model
			});

			this.userMenuView.show({
				top: event.clientY,
				left: event.clientX
			});
			
			this.listenTo(this.userMenuView, 'remove-user', this.onRemoveUser, this);
			this.listenTo(this.userMenuView, 'change-admin-rights', this.onChangeAdminRghts, this);
		},

		onRemoveUser: function(userId){
			boardService.removeUser(userId);
		},

		onChangeAdminRghts: function(data){
			boardService.changeAdminRights(data.userId, {isAdmin: data.isAdmin});
		}
	});

	return CollaboratorCollectionView;

});