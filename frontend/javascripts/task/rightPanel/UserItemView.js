define(['marionette'], function(Marionette){

	var UserItemView = Marionette.ItemView.extend({
		template: '#user-search-template',

		events: {
			'click': 'onClick'
		},

		onClick: function(){
			this.trigger('add-user', this.model.get('email'));
		}
	});

	return UserItemView;

});