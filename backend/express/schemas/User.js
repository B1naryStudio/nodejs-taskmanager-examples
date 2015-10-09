var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({
	name: String,
	avatar_url: String,
	email: String,
	password: String,
	password_plain: String
});

User.methods.isValidPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

User.methods.getViewModel = function(){
	return {
		_id: this._id,
		email: this.email,
		name: this.name,
		avatar_url: this.avatar_url
	};
};

module.exports = mongoose.model('User', User);