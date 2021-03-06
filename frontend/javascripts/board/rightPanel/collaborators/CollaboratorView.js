define(['marionette'], function(Marionette){

	var CollaboratorView = Marionette.ItemView.extend({
		template: '#collaborator-view-template',
		className: 'collaborator',

		events: {
			'click': 'onClick'
		},

		onClick: function(){
			this.trigger('click', this.model);
		}
	});

	return CollaboratorView;
	
});