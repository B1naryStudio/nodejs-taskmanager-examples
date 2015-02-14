define(['marionette'], function(Marionette){

	var UserItemView = Marionette.ItemView.extend({
		template: '#user-search-template',
		className: 'user-item',

		events: {
			'click': 'onClick'
		},

		onClick: function(){
			this.trigger('add-user', this.model.get('email'));
		}
	});

	return UserItemView;

});