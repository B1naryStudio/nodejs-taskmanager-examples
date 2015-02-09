var taskRepository = require('../repositories/task');
var boardRepository = require('../repositories/board');

var TaskService = function(){

};

TaskService.prototype.addTask = function(task, callback){
	var boardId = task.boardId;
	delete task.boardId;
	taskRepository.add(task, function(err, model){
		if (err) {
			return callback(err, null);
		}
		boardRepository.addTask(boardId, model._id, function(err, data){
			console.log(err, data);
			return callback(err, model);
		});	
	});
};

module.exports = new TaskService();