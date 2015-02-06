define(['backbone', './Board'], function(Backbone, Board){
	var BoardCollection = Backbone.Collection.extend({
		model: Board,
		url: '/api/board'
	});

	return BoardCollection;
});