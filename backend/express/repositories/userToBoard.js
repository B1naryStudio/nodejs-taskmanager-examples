var Repository = require('../units/Repository');
var UserToBoard = require('../schemas/UserToBoard');
var ObjectId = require('mongoose').Types.ObjectId;

function UserToBoardRepository (){
	Repository.prototype.constructor.call(this);
	this.model = UserToBoard;
}

UserToBoardRepository.prototype = new Repository();

UserToBoardRepository.prototype.findBoardsByUserId = function(userId, callback) {
	var query = this.model.find({user: userId}).populate('board');
	query.exec(function(err, data){
		if (err || !data){
			return callback(err, data);
		}

		var boards = data.map(function(item){
			return item.board;
		});

		return callback(err, boards);
	});
};

UserToBoardRepository.prototype.findUsersByBoardId = function(boardId, callback) {
	var query = this.model.find({board: boardId}).populate('user');
	query.exec(function(err, data){
		if (err || !data){
			return callback(err, data);
		}

		var users = data.map(function(item){
			return item.user;
		});

		return callback(err, users);
	});
};

module.exports = new UserToBoardRepository();