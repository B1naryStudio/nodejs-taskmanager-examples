define(['marionette'], function(Marionette){
	var UserView = Marionette.ItemView.extend({
		template: '#user-template'	
	});

	return UserView;
});