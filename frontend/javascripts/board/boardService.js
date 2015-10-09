define([], function(){

	var BoardService = function(){
	};

	BoardService.prototype.setBoardId = function(boardId) {
		this.boardId = boardId;
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

	BoardService.prototype.removeUser = function(userId, callback) {
		var url = '/api/board/' + this.boardId + '/user/' + userId;
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

	BoardService.prototype.changeAdminRights = function(userId, data, callback) {
		var url = '/api/board/' + this.boardId + '/user/' + userId;
		$.ajax({
			method: 'PUT',
			data: data,
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

	BoardService.prototype.isAdmin = function(userId, callback) {
		var url = '/api/board/' + this.boardId + '/user/' + userId + '/isadmin';
		$.ajax({
			method: 'GET',
			url: url,

			success: function(data){
				if (callback){
					callback(data);
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