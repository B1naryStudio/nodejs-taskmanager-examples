var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	_id: ObjectId,
	name: String,
	avatar_url: String,
	email: String,
	boards [ _id: ObjectId]
});

module.exports = mongoose.model('User', userSchema);
