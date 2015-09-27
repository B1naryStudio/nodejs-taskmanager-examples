define(['backbone'], function(Backbone){
	var HeaderTitle = Backbone.Model.extend({
		defaults: {
			board: undefined
		},

		initialize: function(){
		}
	});

	return HeaderTitle;
});