define(['backbone'], function(Backbone){

	var Task = Backbone.Model.extend({
		idAttribute: '_id',
		defaults: {
			name: undefined,
			description: undefined,
			isArchived: false,
			status: undefined,
			tasks: [{
				value: 'to-do',
				text: 'To Do'
			}, {
				value: 'in-progress',
				text: 'In Progress'
			}, {
				value: 'done',
				text: 'Done'
			}]
		},
		urlRoot: '/api/task'
	});

	return Task;

});