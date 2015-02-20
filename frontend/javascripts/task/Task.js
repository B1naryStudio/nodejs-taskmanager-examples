define(['backbone'], function(Backbone){

	var Task = Backbone.Model.extend({
		idAttribute: '_id',
		defaults: {
			name: undefined,
			description: undefined,
			archived: false
		},
		urlRoot: '/api/task'
	});

	return Task;

});