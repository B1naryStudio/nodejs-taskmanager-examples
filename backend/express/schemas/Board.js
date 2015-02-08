var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Board = new mongoose.Schema({
	name: String,
	tasks: {
		type: [ObjectId],
		default: []
	},
	isPrivate: Boolean,
	users : [{
		_id : ObjectId,
		isAdmin : Boolean
	}],
});

module.exports = mongoose.model('Board', Board);