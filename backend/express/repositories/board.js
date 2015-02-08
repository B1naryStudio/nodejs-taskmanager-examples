var Repository = require('../units/Repository');
var Board = require('../schemas/Board');

function BoardRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Board;
}

BoardRepository.prototype = new Repository();

BoardRepository.prototype.addTask = function(boardId, taskId, callback) {
	var self = this;
	this.model.findByIdAndUpdate(boardId, 
		{$push: {'tasks': taskId}}, 
	    {safe: true, upsert: true},
    callback);
};

module.exports = new BoardRepository();