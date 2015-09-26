define(['backbone', '../../../header/User'], function(Backbone, User){

	var UserCollection = Backbone.Collection.extend({
		model: User,
		url: function(){
			return typeof this.text === 'undefined' ? '/api/user' : 
				'/api/user/board/' + this.boardId + '/?search=' + this.text;
		},

		initialize: function(models, options){
			this.boardId = options.boardId;
		},

		setText: function(text){
			var self = this;
			this.text = text;
			this.fetch({
				error: function(){
					self.reset();
				}
			});
		},

		setBoard: function(boardId){
			var self = this;
			this.boardId = boardId;
		}

	});

	return UserCollection;

});