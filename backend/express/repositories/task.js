var Repository = require('../units/Repository');
var Task = require('../schemas/Task');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

function TaskRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Task;
}

TaskRepository.prototype = new Repository();

TaskRepository.prototype.add = function(obj, callback) {
	if (obj && obj.boardId){
		obj.boardId = ObjectId(obj.boardId);
	}
	Repository.prototype.add.call(this, obj, callback);
};

TaskRepository.prototype.findByBoardId = function(boardId, queryObj, callback) {
	queryObj.boardId = Object(boardId);
	var query = this.model.find(queryObj, callback);
};

module.exports = new TaskRepository();