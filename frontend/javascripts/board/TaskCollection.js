define(['backbone', './Task'], function(Backbone, Task){
	var TaskCollection = Backbone.Collection.extend({
		model: Task,
		url: function(){
			return '/api/board/' + this.boardId + '/task';
		}
	});

	return TaskCollection;
});