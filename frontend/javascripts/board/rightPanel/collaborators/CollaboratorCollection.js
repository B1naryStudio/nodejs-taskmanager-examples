define(['backbone', 'header/User'], function(Backbone, Collaborator){

	var CollaboratorCollection = Backbone.Collection.extend({
		model: Collaborator,
		url: function(){
			return '/api/board/' + this.boardId + '/user';
		},

		setBoard: function(boardId){
			this.boardId = boardId;
			this.fetch();
		}
	});

	return CollaboratorCollection;

});