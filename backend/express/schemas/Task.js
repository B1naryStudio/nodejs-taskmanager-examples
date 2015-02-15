var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Task = new mongoose.Schema({
	name : String,
	decription : String,
	assignee :  {
		type: ObjectId,
		ref: 'User'
	},
	status: {
		type: String,
		default: 'to-do'
	}
});

module.exports = mongoose.model('Task', Task);
