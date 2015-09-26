var boardRepository = require('../repositories/board');
var userRepository = require('../repositories/user');
var taskRepository = require('../repositories/task');
var userToBoardRepository = require('../repositories/userToBoard');

var BoardService = function(){

};

BoardService.prototype.add = function(boardObject, userId, callback) {
	var self = this;
	
	boardRepository.add(boardObject, function(err, board){
		if (err){
			return callback(err);
		}

		var userToBoard = {
			board: board._id,
			user: userId
		};

		userToBoardRepository.add(userToBoard, function(err, data){
			return callback(err, board);
		});

	});
};

BoardService.prototype.findUnarchivedTasks = function(boardId, callback) {
	taskRepository.findByBoardId(boardId, {isArchived: false}, callback);
};

BoardService.prototype.findArchivedTasks = function(boardId, callback) {
	taskRepository.findByBoardId(boardId, {isArchived: true}, callback);
};

BoardService.prototype.findBoardsByUserId = function(userId, callback) {
	userToBoardRepository.findBoardsByUserId(userId, callback);
};

BoardService.prototype.findBoardUsers = function(boardId, callback) {
	userToBoardRepository.findUsersByBoardId(boardId, callback);
};

BoardService.prototype.addUser = function(boardId, userEmail, callback) {
	userRepository.findOne({email: userEmail}, function(err, user){
		if (err || !user) {
			return callback(err, user);
		}

		var userToBoard = {
			user: user._id,
			board: boardId
		};

		userToBoardRepository.add(userToBoard, function(err, data){
			return callback(err);
		});
	});
};

BoardService.prototype.isBoardMember = function(options, callback) {

	boardRepository.findOne({_id: options.board}, function(err, board){

		if (err || !board){
			return callback(err);
		}

		if (!board.isPrivate){
			return callback(null, true);
		}

		userToBoardRepository.findOne(options, function(err, data){
			if (err){
				return callback(err);
			}
			return callback(err, !!data);
		});

	});

};

BoardService.prototype.isBoardAdmin = function(options, callback) {
	
	userToBoardRepository.findOne(options, function(err, data){
		if (err){
			return callback(err);
		}

		if (data){
			return callback(err, data.isAdmin);
		}
	});

};

module.exports = new BoardService();