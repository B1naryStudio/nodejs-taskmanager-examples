define([], function(){

	var BoardService = function(){

	};

	BoardService.prototype.addUser = function(boardId, email, callback) {
		var url = '/api/board/' + boardId + '/user';
		$.ajax({
			method: 'POST',
			data: {email: email},
			url: url,

			success: function(){
				callback(null);
			},

			error: function(jqXHR, status, err){
				callback(err);
			}
		});
	};

	BoardService.prototype.removeBoard = function(boardId, callback) {
		var url = '/api/board/' + boardId;
		$.ajax({
			method: 'DELETE',
			url: url,

			success: function(){
				if (callback){
					callback(null);
				}
			},

			error: function(jqXHR, status, err){
				if (callback){
					callback(err);
				}
			}
		});
	};

	return new BoardService();

});