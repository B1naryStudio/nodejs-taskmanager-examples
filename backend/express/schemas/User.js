var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({
	name: String,
	avatar_url: String,
	email: String,
	password: String,
	boards: [ObjectId]
});

User.methods.isValidPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);