define(['marionette'], function(Marionette){

	var BoardLayout = Marionette.LayoutView.extend({
		template: '#task-layout-template'
	});

	return BoardLayout;

});