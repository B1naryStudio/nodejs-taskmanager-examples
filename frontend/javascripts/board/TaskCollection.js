define(['backbone', './Task'], function(Backbone, Task){
	var TaskCollection = Backbone.Collection.extend({
		model: Task,
		url: function(){
			return '/api/board/' + this.boardId + '/task' + (this.archived ? '/archived' : '');
		},
		setArchived: function(archived){
			var self = this;
			this.archived = !!archived;
			this.fetch({
				error: function(){
					self.reset();
				}
			});
		}
	});

	return TaskCollection;
});