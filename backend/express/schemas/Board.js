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
		userId: {
			type : ObjectId,
			ref: 'Board'
		},
		isAdmin : {
			type: Boolean,
			default: false
		}
	}],
});

module.exports = mongoose.model('Board', Board);