define(['backbone'], function(Backbone){

	var Task = Backbone.Model.extend({
		idAttribute: '_id',
		defaults: {
			name: undefined,
			description: undefined,
			isArchived: false,
			status: undefined
		},
		urlRoot: '/api/task'
	});

	return Task;

});