define(['backbone'], function(Backbone){

	var Board = Backbone.Model.extend({
		idAttribute: '_id',

		defaults: {
			name: undefined
		}
	});

	return Board;

});