define(['app/context'], function(context){

	var Board = Backbone.Model.extend({
		urlRoot: '/api/board/',
		idAttribute: '_id',
		defaults: {
			name: undefined,
			isPrivate: undefined,
			isAdmin: context.isAdmin
		},

		initialize: function(){
			this.fetch();
			this.bindListeners();
		},

		bindListeners: function(){
			var self = this;

			this.on('sync error', function(){
				self.isSynced = true;
			});
		}
	});

	return Board;

});