var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({
	name: String,
	avatar_url: String,
	email: String,
	password: String,
	password_plain: String,
	boards: [{
		type: ObjectId,
		ref: 'Board'
	}]
});

User.methods.isValidPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

User.methods.getViewModel = function(){
	return {
		email: this.email
	};
};

module.exports = mongoose.model('User', User);