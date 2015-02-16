define(['backbone', '../../../header/User'], function(Backbone, User){

	var UserCollection = Backbone.Collection.extend({
		model: User,
		url: function(){
			return typeof this.text === 'undefined' ? '/api/user' : '/api/user?search=' + this.text;
		},
		setText: function(text){
			var self = this;
			this.text = text;
			this.fetch({
				error: function(){
					self.reset();
				}
			});
		}

	});

	return UserCollection;

});