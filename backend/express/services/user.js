var userRepository = require('../repositories/user');
var bcrypt = require('bcrypt-nodejs');

function UserService(){

}

UserService.prototype.createUser = function(data, callback) {
	this.encodePassword(data.password, function(password){
		data.password = password;
		userRepository.add(data, callback);
	});
};

UserService.prototype.encodePassword = function(password, callback) {
	bcrypt.genSalt(6546, function(err, salt) {
		bcrypt.hash(password, salt, null, function(err, hash) {
			callback(hash);
		});
	});
};

UserService.prototype.findById = function(id, callback) {
	userRepository.findOne({_id: id}, callback);
};

UserService.prototype.findByEmail = function(email, callback) {
	userRepository.findOne({email: email}, callback);
};

module.exports = new UserService();