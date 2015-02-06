define(['marionette'], function(Marionette){

	var BoardLayout = Marionette.LayoutView.extend({
		template: '#board-layout-template'
	});

	return BoardLayout;

});