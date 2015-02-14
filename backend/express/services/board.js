var boardRepository = require('../repositories/board');
var userRepository = require('../repositories/user');

var BoardService = function(){

};

BoardService.prototype.addUser = function(boardId, userEmail, callback) {
	userRepository.findByEmailAndAddBoard(userEmail, boardId, function(err, data){
		if (err) {
			return callback(err);
		}

		boardRepository.findByIdAndAddUser(boardId, data._id, function(err, data){
			return callback(err);
		});
	});
};

module.exports = new BoardService();