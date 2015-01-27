var Repository = require('../units/Repository');
var Board = require('../schemas/Board');


function BoardRepository (){
	Repository.prototype.constructor.call(this);
	this.model = Board;
}

BoardRepository.prototype = new Repository();

module.exports = new BoardRepository();