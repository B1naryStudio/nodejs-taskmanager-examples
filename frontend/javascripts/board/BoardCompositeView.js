define(['marionette', './BoardItemView'], function(Marionette, BoardItemView){

	var BoardCompositeView = Marionette.CompositeView.extend({
		childView: BoardItemView,
		childViewContainer: '#boards-container',
		template: '#boards-template'
	});

	return BoardCompositeView;

});