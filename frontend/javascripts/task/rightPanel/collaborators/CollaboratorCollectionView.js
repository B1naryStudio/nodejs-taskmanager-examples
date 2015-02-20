define(['marionette', './CollaboratorView'], function(Marionette, CollaboratorView){

	var CollaboratorCollectionView = Marionette.CollectionView.extend({
		template: '#collaborator-collection-view-template',
		childView: CollaboratorView

	});

	return CollaboratorCollectionView;

});