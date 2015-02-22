var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Task = require('./Task');

var Board = new mongoose.Schema({
	name: String,
	isPrivate: Boolean,
	users : [{
		userId: {
			type : ObjectId,
			ref: 'User'
		},
		isAdmin : {
			type: Boolean,
			default: false
		}
	}],
});

module.exports = mongoose.model('Board', Board);