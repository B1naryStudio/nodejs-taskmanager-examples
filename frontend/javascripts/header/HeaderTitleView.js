define(['marionette'], function(Marionette){
	
	var HeaderTitleView = Marionette.ItemView.extend({
		template: '#header-title-template'
	});

	return HeaderTitleView;
});