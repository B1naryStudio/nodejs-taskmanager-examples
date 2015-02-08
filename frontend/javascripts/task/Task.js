define(['backbone'], function(Backbone){

	var Task = Backbone.Model.extend({
		idAttribute: '_id',

		defaults: {
			name: undefined
		},

		initialize: function(){
			if (this.isNew()){
				this.urlRoot = '/api/task';
			}
		}
	});

	return Task;

});