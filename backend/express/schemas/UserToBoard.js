var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var User = new mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User'
	},
	board: {
		type: ObjectId,
		ref: 'Board'
	},
	isAdmin: {
		type: Boolean, 
		default: false
	}
});

module.exports = mongoose.model('UserToBoard', User);