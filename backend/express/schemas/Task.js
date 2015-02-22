var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Task = new mongoose.Schema({
	name : String,
	description : String,
	assignee :  {
		type: ObjectId,
		ref: 'User'
	},
	status: {
		type: String,
		default: 'to-do'
	},
	isArchived: {
		type: Boolean,
		default: false
	},
	boardId: {
		type: ObjectId,
		ref: 'Board'
	}
});

Task.methods.getViewModel = function(){
	return {
		name: this.name,
		description: this.description,
		status: this.status,
		isArchived: this.isArchived
	};
};

module.exports = mongoose.model('Task', Task);
