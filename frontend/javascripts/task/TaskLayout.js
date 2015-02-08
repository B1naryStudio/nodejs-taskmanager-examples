define(['marionette'], function(Marionette){

	var TaskLayout = Marionette.LayoutView.extend({
		template: '#task-layout-template'
	});

	return TaskLayout;

});