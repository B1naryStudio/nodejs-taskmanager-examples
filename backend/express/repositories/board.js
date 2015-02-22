var Repository = require('../units/Repository');
var Board = require('../schemas/Board');
var ObjectId = require('mongoose').Types.ObjectId;

function BoardRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Board;
}

BoardRepository.prototype = new Repository();

BoardRepository.prototype.addTask = function(boardId, taskId, callback) {
	this.model.findByIdAndUpdate({_id: ObjectId(boardId)}, 
		{$push: {'tasks': {task:taskId}}}, 
		{safe: true, upsert: true},
	callback);
};

BoardRepository.prototype.findByIdAndAddUser = function(boardId, userId, callback) {
	this.model.findByIdAndUpdate({_id: ObjectId(boardId)}, 
		{$push: {'users': {userId: userId}}}, 
		{safe: true, upsert: true},
	callback);
};

BoardRepository.prototype.findUsersByBoardId = function(boardId, callback) {
	var query = this.model.findOne({_id: boardId});
	query.populate('users.userId');
	query.exec(function(err, data){
		var res;
		if (data){
			res = data.users.map(function(el){
				return el.userId;
			});
		}
		callback(err, res);
	});
};

module.exports = new BoardRepository();