var Repository = require('../units/Repository');
var User = require('../schemas/User');


function UserRepository (){
	Repository.prototype.constructor.call(this);
	this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.findOneAndAddBoard = function(queryObj, boardId, callback) {
	this.model.findOneAndUpdate(queryObj, 
		{$push: {'boards': boardId}}, 
		{safe: true, upsert: true},
	callback);
};

module.exports = new UserRepository();