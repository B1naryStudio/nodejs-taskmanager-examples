var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Task = require('./Task');

var Board = new mongoose.Schema({
	name: String,
	tasks: [{
		type: ObjectId,
		ref: 'Task'
	}],
	isPrivate: Boolean,
	users : [{
		_id : ObjectId,
		isAdmin : Boolean
	}],
});

module.exports = mongoose.model('Board', Board);