define([], function(){

	var Board = Backbone.Model.extend({
		urlRoot: '/api/board/',
		idAttribute: '_id',
		defaults: {
			name: undefined,
			isPrivate: undefined
		},

		initialize: function(){
			this.fetch();
		}
	});

	return Board;

});