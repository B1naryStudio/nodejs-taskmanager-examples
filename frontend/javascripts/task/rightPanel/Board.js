define([], function(){

	var Board = Backbone.Model.extend({
		defaults: {
			name: undefined,
			isPrivate: undefined
		}
	});

	return Board;

});