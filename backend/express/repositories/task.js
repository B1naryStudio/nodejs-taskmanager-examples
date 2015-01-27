var Repository = require('../units/Repository');
var Task = require('../schemas/Task');


function TaskRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Task;
}

TaskRepository.prototype = new Repository();

module.exports = new TaskRepository();