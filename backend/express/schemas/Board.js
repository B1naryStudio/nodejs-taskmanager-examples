var mongoose = require('mongoose');

var Board = new mongoose.Schema({
	_id : ObjectId,
	name: String,
	columns: [{
		name : String,
		tasks: [_id: ObjectId]
	}],
	isPrivate: Boolean,
	users : [{
		_id : ObjectId,
		isAdmin : Boolean
	}],
});

module.exports = mongoose.model('Board', boardSchema);