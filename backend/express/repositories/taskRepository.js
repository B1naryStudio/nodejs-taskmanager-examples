var Repository = require('../units/Repository');
var Task = require('../schemas/Task');


function TaskRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Task;
}

module.exports = new TaskRepository();