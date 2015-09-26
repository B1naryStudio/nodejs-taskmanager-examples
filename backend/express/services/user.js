var userRepository = require('../repositories/user');
var userToBoardRepository = require('../repositories/userToBoard');
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');

function UserService(){

}

UserService.prototype.getUsers = function(query, boardId, callback) {
	var obj = {};
	if (query.search){
		obj.email = new RegExp(query.search, 'i');
	}
	
	userRepository.findWhere(obj, function(err, data){

		if (err){
			return callback(err);
		}

		data = data.map(function(it){return it.getViewModel();});
		
		userToBoardRepository.findUsersByBoardId(boardId, function(err, usersOnBoard){
			if (err){
				return callback(err);
			}
			data = data.filter(function(item){
				return !_.some(usersOnBoard, function(user){
					return item.email === user.email;
				});
			});

			callback(err, data);

		});	

	});
};

UserService.prototype.createUser = function(data, callback) {
	this.encodePassword(data.password, function(password){
		data.password = password;
		userRepository.add(data, callback);
	});
};

UserService.prototype.encodePassword = function(password, callback) {
	if (callback === false){
		var salt = bcrypt.genSaltSync(6546);
		return bcrypt.hashSync(password, salt);
	}
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