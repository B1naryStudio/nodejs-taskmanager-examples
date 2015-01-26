var Repository = require('../units/Repository');
var User = require('../schemas/User');


function UserRepository (){
	Repository.prototype.constructor.call(this);
	this.model = User;
}

module.exports = new UserRepository();