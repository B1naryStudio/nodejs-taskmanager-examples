var boardRepository = require('../repositories/board');
var userRepository = require('../repositories/user');

var BoardService = function(){

};

BoardService.prototype.add = function(boardObject, userId, callback) {
	var self = this;
	boardObject.users = [{
		userId: userId,
		isAdmin: true
	}];
	
	boardRepository.add(boardObject, function(err, board){
		if (err){
			return callback(err);
		}

		userRepository.findOneAndAddBoard({_id: userId}, board._id, function(err, data){
			return callback(err, board);
		});

	});
};

BoardService.prototype.findBoardsForUserId = function(user, callback) {
	user.populate('boards', function(err, data){
		callback(err, data ? data.boards : null);
	});
};

BoardService.prototype.addUser = function(boardId, userEmail, callback) {
	userRepository.findOneAndAddBoard({email: userEmail}, boardId, function(err, data){
		if (err) {
			return callback(err);
		}

		boardRepository.findByIdAndAddUser(boardId, data._id, function(err, data){
			return callback(err);
		});
	});
};

module.exports = new BoardService();