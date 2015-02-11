define(['backbone'], function(Backbone){
	var User = Backbone.Model.extend({
		defaults: {
			email: undefined
		}
	});

	return User;
});