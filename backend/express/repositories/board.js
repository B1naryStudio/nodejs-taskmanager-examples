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

module.exports = new BoardRepository();