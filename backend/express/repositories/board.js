var Repository = require('../units/Repository');
var Board = require('../schemas/Board');
var ObjectId = require('mongoose').Types.ObjectId;

function BoardRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Board;
}

BoardRepository.prototype = new Repository();

BoardRepository.prototype.addTask = function(boardId, taskId, callback) {
	var self = this;
	this.model.findByIdAndUpdate({_id: ObjectId(boardId)}, 
		{$push: {'tasks': taskId}}, 
	    {safe: true, upsert: true},
    callback);
};

BoardRepository.prototype.fieldsToPopulate = ['tasks'];

module.exports = new BoardRepository();