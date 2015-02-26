var boardRepository = require('../repositories/board');
var userRepository = require('../repositories/user');
var taskRepository = require('../repositories/task');

var BoardService = function(){
	this.initACL();
};

BoardService.prototype.initACL = function() {
	acl.allow('invited_viewer', 'boards', 'get');
	acl.allow('member', 'boards', 'get', 'put');
	acl.allow('admin', 'boards', '*');
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

BoardService.prototype.findUnarchivedTasks = function(boardId, callback) {
	taskRepository.findByBoardId(boardId, {isArchived: false}, callback);
};

BoardService.prototype.findArchivedTasks = function(boardId, callback) {
	taskRepository.findByBoardId(boardId, {isArchived: true}, callback);
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