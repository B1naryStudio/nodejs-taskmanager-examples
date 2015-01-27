var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var User = new mongoose.Schema({
	name: String,
	avatar_url: String,
	email: String,
	boards: [ObjectId]
});

module.exports = mongoose.model('User', User);
