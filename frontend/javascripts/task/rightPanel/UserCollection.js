define(['backbone', '../../header/User'], function(Backbone, User){

	var UserCollection = Backbone.Collection.extend({
		model: User,
		url: function(){
			return !this.text ? '/api/user' : '/api/user?search=' + this.text;
		}

	});

	return UserCollection;

});