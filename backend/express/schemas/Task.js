var mongoose = require('mongoose');

var Task = new mongoose.Schema({
	_id : ObjectId,
	name : String,
	decription : String,
	assignee :  ObjectId
});

module.exports = mongoose.model('Task', taskSchema);
